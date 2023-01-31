# Summary of the contents

This is the code to reproduce intent discovery metrics used for our experiments.

Paper title: _Going beyond research datasets: Novel intent discovery in the industry
setting._

Authors: Aleksandra Chrabrowa, Tsimur Hadeliya, Dariusz Kajtoch, Robert Mroczkowski,
Piotr Rybak

Paper link: _to be added_

Presented at: EACL 2023

# Intent discovery metrics

> We compute metrics based on cluster ids from K-means algorithm and ground truth
> labels. The discovery quality is probed with three standard clustering metrics, i.e.
> Accuracy (ACC) using the Hungarian algorithm, Normalized Mutual Information (NMI) and
> Adjusted Rand Index (ARI). We also introduce two additional metrics. First, the
> _binary F1-score_ i.e., macro F1-score with a majority vote on cluster label
> calculated on the whole dataset where all known intents are one class, and all novel
> intents are the second class. Second, the _macro F1-score_ with a majority vote on the
> cluster label. It turns the clustering quality problem into a multilabel
> classification. In the main part of the paper, we report **AVG** i.e., the average of
> five metrics over all seeds. AVG increases with clustering quality up to 100%. AVG is
> the primary metric used for model selection.

_Going beyond research datasets: Novel intent discovery in the industry setting._
Chrabrowa et al.

# How to use the code?

- Install `requirements.txt`, Python `>=3.7.0`
- Use the function `all_metrics`
- `all_metrics` returns a dictionary of metric names and values
- the following entries are used to calculate _AVG_ metric mentioned in the paper:
  - `test/ext_metric/sklearn/f1_macro_score_mean`
  - `test/ext_metric/sklearn/accuracy_index_mean`
  - `test/ext_metric/sklearn/normalized_mutual_info_score_mean`
  - `test/ext_metric/sklearn/adjusted_rand_score_mean`
  - `binary/ext_metric/sklearn/f1_macro_score_mean`
