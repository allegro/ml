import React, { useState } from "react";
import {
    ShoppingCart, Brain, Search, TrendingUp,
    Package, BarChart3, Eye, ChevronDown
} from "lucide-react";
import styles from "./FourPillars.module.css";

export interface IPillar {
    icon: string;
    title: string;
    description: string;
    scope: string[];
}

interface FourPillarsProps {
    pillars: IPillar[];
}

const ICON_MAP: Record<string, React.ElementType> = {
    ShoppingCart,
    Brain,
    Search,
    TrendingUp,
    Package,
    BarChart3,
    Eye,
};

const FourPillars: React.FunctionComponent<FourPillarsProps> = ({ pillars }) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <section id="areas" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.introBox}>
                    <h2 className={styles.introTitle}>About Us</h2>
                    <p className={styles.introText}>
                        The Allegro AI Hub is a high-bandwidth ecosystem where silos between research, engineering, and product vanish. As one of Europe&apos;s largest AI teams, we unite <b>Data Scientists, ML Researchers, Analysts, and Engineers</b> to tackle high-dimensional challenges that lack &quot;off-the-shelf&quot; solutions.
                    </p>
                    <p className={styles.introText}>
                        From <b>Multi-Objective Ranking</b> across 300M offers to <b>Personalized Recommendations</b> amidst extreme cardinality, we solve what standard tools cannot. Our strength is our interdisciplinarity: <b>Analysts</b> decode complex data signals, <b>Scientists</b> architect probabilistic frameworks, and <b>Engineers</b> build the low-latency systems that power them. We value the intellectual stamina needed to master <b>Non-Stationary Data</b> and <b>Complex Measurement Loops</b> in an environment where every deployment impacts 20M customers and hundreds of millions of transactions.
                    </p>
                    <p className={styles.introHighlight}>
                        <b>Want to see the scale of the challenge?<br />Below is a glimpse of the problems you will crack once you join us.</b>
                    </p>
                </div>

                <div className={styles.grid}>
                    {pillars.map((pillar, index) => {
                        const Icon = ICON_MAP[pillar.icon] || Eye;
                        const isExpanded = expandedIndex === index;
                        return (
                            <div
                                key={index}
                                className={styles.pillarCard}
                                onClick={() => toggleExpand(index)}
                            >
                                <div className={styles.pillarHeader}>
                                    <div className={styles.pillarIcon}>
                                        <Icon color="#ffffff" size={24} />
                                    </div>
                                    <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                                </div>

                                <p className={styles.pillarDesc}>{pillar.description}</p>

                                <button
                                    className={styles.toggleBtn}
                                    onClick={(e) => { e.stopPropagation(); toggleExpand(index); }}
                                >
                                    <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
                                    <ChevronDown
                                        size={16}
                                        className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}
                                    />
                                </button>

                                <div className={`${styles.scopeWrapper} ${isExpanded ? styles.scopeWrapperExpanded : ''}`}>
                                    <div className={styles.scopeInner}>
                                        <div className={styles.scopeBox}>
                                            <h4 className={styles.scopeLabel}>Scope</h4>
                                            <ul className={styles.scopeList}>
                                                {pillar.scope.map((item, idx) => (
                                                    <li key={idx} className={styles.scopeItem}>
                                                        <span className={styles.scopeDot} />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FourPillars;
