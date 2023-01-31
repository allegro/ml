import typing as T
from collections import Counter

import numpy as np
import sklearn.metrics as skm
from scipy.optimize import linear_sum_assignment as hungarian
from sklearn.metrics.cluster import contingency_matrix


def comb2(n: int) -> int:
    """Newton symbol N over 2."""
    return n * (n - 1) // 2


def confusion_matrix(
    labels_true: np.ndarray, labels_pred: np.ndarray, *args: T.Any, **kwargs: T.Any
) -> T.Tuple[int, int, int, int]:
    # Matrix of shape (labels_true, labels_pred).
    contingency = contingency_matrix(labels_true, labels_pred, *args, **kwargs)

    # true positives + false positives
    tp_fp = sum(comb2(x) for x in np.ravel(contingency.sum(axis=0)))
    # true positives + false negatives
    tp_fn = sum(comb2(x) for x in np.ravel(contingency.sum(axis=1)))
    # true positives
    tp = sum(comb2(x) for x in np.ravel(contingency))
    # all pairs
    tp_fp_tn_fn = comb2(contingency.sum())

    fp = tp_fp - tp
    assert fp >= 0
    fn = tp_fn - tp
    assert fn >= 0
    tn = tp_fp_tn_fn - (tp + fn + fp)
    assert tn >= 0

    return tn, fp, fn, tp


def f1_index(
    labels_true: np.ndarray, labels_pred: np.ndarray, *args: T.Any, **kwargs: T.Any
) -> float:
    """Calculate f1_score for clustering (external metric) in a way similar to
    computing Rand index.

    false_positive - number of pairs in the same cluster with different ground truth
                     labels
    true_positive - number of pairs in the same cluster with same ground truth labels
    etc.
    References
    ----------
    [1] https://c.qxlint/zYJ6O3Y/.
    Parameters
    ----------
    labels_true
        ground truth labels (annotated) for data
    labels_pred
        predicted cluster labels for data
    args
        are passed to confusion_matrix
    kwargs
        are passed to confusion matrix
    Returns
    -------
        f1_index value
    """

    _, fp, fn, tp = confusion_matrix(labels_true, labels_pred, *args, **kwargs)

    try:
        precision = tp / (tp + fp)
        recall = tp / (tp + fn)
    except ZeroDivisionError:
        return 0.0

    try:
        return 2.0 * precision * recall / (precision + recall)
    except ZeroDivisionError:
        return 0.0


def _majority_assigment(labels_true: np.ndarray, labels_pred: np.ndarray) -> np.ndarray:
    # Assign labels_true to labels_pred by majority vote - depends on the label order.
    pred2true: T.Dict = {
        p: Counter(labels_true[labels_pred == p]).most_common(1)[0][0]
        for p in set(labels_pred)
    }
    return np.array([pred2true[i] for i in labels_pred])


def f1_macro_score(
    labels_true: np.ndarray,
    labels_pred: np.ndarray,
    selected_labels: T.Optional[T.List[T.Any]] = None,
) -> float:
    """Calculate f1 macro score for clustering in the following steps:

    - assign ground truth labels to each cluster with majority vote
    - compute f1 for each class and average the result with macro
    Parameters
    ----------
    labels_true
        ground truth labels (annotated) for data
    labels_pred
        predicted cluster labels for data
    selected_labels
        optional parameter
        the set of (ground truth) labels to include in the average.
        For example only train or test labels can be included.
        By default, all labels are included.
    Returns
    -------
        f1_macro value
    """
    labels_pred = _majority_assigment(labels_true, labels_pred)
    return skm.f1_score(
        y_true=labels_true, y_pred=labels_pred, labels=selected_labels, average="macro"
    )


def accuracy_index(
    labels_true: np.ndarray, labels_pred: np.ndarray, *args: T.Any, **kwargs: T.Any
) -> float:
    contingency = contingency_matrix(labels_true, labels_pred, *args, **kwargs)

    _, assign = hungarian(-contingency)

    optimal = contingency[:, assign]

    try:
        return optimal.diagonal().sum() / contingency.sum()
    except ZeroDivisionError:
        return 0.0


def all_metrics(
    labels_true: np.ndarray,
    labels_pred: np.ndarray,
    labels_train: T.Optional[T.List[T.Any]] = None,
) -> T.Dict[str, float]:
    """Calculate all metrics for clustering.

    - external metrics
    - metrics which take into account train/test labels
    Parameters
    ----------
    labels_true
        ground truth labels (annotated) for data
    labels_pred
        predicted cluster labels for data
    labels_train
        labels which were (at least partially) visible when fitting the cluster model
        subset of labels_true
    Returns
    -------
        dictionary with metric names and values
    """
    metrics = dict()
    metrics.update(
        external_metrics(
            labels_true,
            labels_pred,
        )
    )
    if labels_train is not None:
        # we want to measure external clustering metrics that are only sensitive to
        # whether `label_true` belongs to `labels_train` or not
        result = external_metrics(
            np.isin(labels_true, labels_train),
            labels_pred,
        )
        metrics.update({f"binary/{key}": val for key, val in result.items()})
        metrics.update(
            train_test_metrics(
                labels_true,
                labels_pred,
                labels_train,
            )
        )
    return metrics


def train_test_metrics(
    labels_true: np.ndarray,
    labels_pred: np.ndarray,
    labels_train: T.List[T.Any],
) -> T.Dict[str, float]:
    """Calculate clustering metrics which take into account train and test
    labels.

    - all external and internal metrics calculated for examples from train/test
      separately
    - f1_macro for train/test labels only
    - f1_binary train vs test and test vs train
    Parameters
    ----------
    labels_true
        ground truth labels (annotated) for data
    labels_pred
        predicted cluster labels for data
    labels_train
        labels which were (at least partially) visible when fitting the cluster model
        subset of labels_true
    Returns
    -------
        dictionary with metric names and values
    """
    assert len(labels_train) > 0, "List of train labels cannot be empty"
    train_mask = np.isin(labels_true, labels_train)
    test_mask = ~train_mask
    assert train_mask.sum() > 0, "Train set cannot be empty"
    assert test_mask.sum() > 0, "Test set cannot be empty"

    metrics = dict()
    masks_and_labels = [(train_mask, "train"), (test_mask, "test")]

    for mask, label in masks_and_labels:
        ext_metrics = external_metrics(
            labels_true=labels_true[mask],
            labels_pred=labels_pred[mask],
        )
        ext_metrics = {f"{label}/{k}": v for k, v in ext_metrics.items()}
        metrics.update(ext_metrics)

    labels_test = list(set(labels_true) - set(labels_train))
    f1_metrics = {
        f"train/ext_metric/sklearn/{f1_macro_score.__name__}": f1_macro_score(
            labels_true=labels_true,
            labels_pred=labels_pred,
            selected_labels=labels_train,
        ),
        f"test/ext_metric/sklearn/{f1_macro_score.__name__}": f1_macro_score(
            labels_true=labels_true,
            labels_pred=labels_pred,
            selected_labels=labels_test,
        ),
    }
    metrics.update(f1_metrics)
    return metrics


def external_metrics(
    labels_true: np.ndarray,
    labels_pred: np.ndarray,
) -> T.Dict[str, float]:
    """Report pair-counting F1 score (custom implementation), Accuracy (custom
    implementation)  Normalized Mutual Information (NMI), Adjusted Rand Index
    (ARI) and Accuracy and other external clustering metrics based on sklearn
    library.

    Optionally returns all external clustering measures from clusterCrit
    R package
    Parameters
    ----------
    labels_true
        ground truth labels (annotated) for data
    labels_pred
        predicted cluster labels for data
    Returns
    -------
        dictionary with metric names and values
    """
    metrics = _external_metrics_sklearn(labels_true, labels_pred)
    metrics = {f"ext_metric/sklearn/{k}": metrics[k] for k in metrics}
    return metrics


def _external_metrics_sklearn(
    labels_true: np.ndarray, labels_pred: np.ndarray
) -> T.Dict[str, float]:
    skm_metric_fcts = [
        skm.normalized_mutual_info_score,
        skm.adjusted_rand_score,
        accuracy_index,
        f1_macro_score,
    ]

    return {
        metric_fct.__name__: metric_fct(labels_true, labels_pred)
        for metric_fct in skm_metric_fcts
    }
