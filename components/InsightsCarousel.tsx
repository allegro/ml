import React, { useRef, useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Play, FileText, ExternalLink, ChevronDown } from "lucide-react";
import styles from "./InsightsCarousel.module.css";

export interface IInsight {
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
    who: string;
    year: number;
}

export interface IResearchPaper {
    title: string;
    authors: string;
    url: string;
    venue: string;
    year: number;
    thumbnail?: string;
}

interface InsightsCarouselProps {
    insights: IInsight[];
    papers: IResearchPaper[];
}

const CAROUSEL_BREAKPOINTS = [
    { maxWidth: 640, slides: 1 },
    { maxWidth: 1024, slides: 2 },
];
const CAROUSEL_DEFAULT_SLIDES = 3;
const CAROUSEL_SPEED = 500;
const INSIGHTS_AUTOPLAY_SPEED = 5000;
const PAPERS_AUTOPLAY_SPEED = 6000;
const CAROUSEL_LIMIT = 7;
function shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
function useSlidesToShow() {
    const getCount = useCallback(() => {
        if (typeof window === "undefined") return 1;
        const w = window.innerWidth;
        for (const bp of CAROUSEL_BREAKPOINTS) {
            if (w < bp.maxWidth) return bp.slides;
        }
        return CAROUSEL_DEFAULT_SLIDES;
    }, []);

    const [count, setCount] = useState(1);

    useEffect(() => {
        setCount(getCount());
        const handleResize = () => setCount(getCount());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [getCount]);

    return count;
}

const InsightsCarousel: React.FunctionComponent<InsightsCarouselProps> = ({ insights, papers }) => {
    const sliderRef = useRef<Slider>(null);
    const pubSliderRef = useRef<Slider>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const slidesToShow = useSlidesToShow();
    const [showAllTalks, setShowAllTalks] = useState(false);
    const [showAllPapers, setShowAllPapers] = useState(false);

    const [carouselInsights, setCarouselInsights] = useState(() => insights.slice(0, CAROUSEL_LIMIT));
    const [carouselPapers, setCarouselPapers] = useState(() => papers.filter((p) => p.thumbnail).slice(0, CAROUSEL_LIMIT));

    useEffect(() => {
        setCarouselInsights(shuffle(insights).slice(0, CAROUSEL_LIMIT));
        setCarouselPapers(shuffle(papers.filter((p) => p.thumbnail)).slice(0, CAROUSEL_LIMIT));
    }, [insights, papers]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const fixTabIndex = () => {
            section.querySelectorAll<HTMLElement>('.slick-slide[aria-hidden="true"] a, .slick-slide[aria-hidden="true"] button').forEach((el) => {
                el.setAttribute("tabindex", "-1");
            });
            section.querySelectorAll<HTMLElement>('.slick-slide:not([aria-hidden="true"]) a, .slick-slide:not([aria-hidden="true"]) button').forEach((el) => {
                el.removeAttribute("tabindex");
            });
        };
        fixTabIndex();
        const observer = new MutationObserver(fixTabIndex);
        observer.observe(section, { attributes: true, attributeFilter: ["aria-hidden"], subtree: true });
        return () => observer.disconnect();
    }, [slidesToShow]);

    const settings = {
        dots: true,
        infinite: true,
        speed: CAROUSEL_SPEED,
        slidesToShow,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: INSIGHTS_AUTOPLAY_SPEED,
    };

    const pubSettings = {
        ...settings,
        autoplaySpeed: PAPERS_AUTOPLAY_SPEED,
    };

    return (
        <section id="media" className={styles.section} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Preview our contributions</h2>
                    <p className={styles.sectionSubtitle}>View our conference talks, presentations and articles</p>
                </div>

                <div className={styles.carouselWrapper}>
                    <button
                        onClick={() => sliderRef.current?.slickPrev()}
                        className={`${styles.navBtn} ${styles.navBtnPrev}`}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => sliderRef.current?.slickNext()}
                        className={`${styles.navBtn} ${styles.navBtnNext}`}
                        aria-label="Next slide"
                    >
                        <ChevronRight size={20} />
                    </button>

                    <Slider key={`insights-${slidesToShow}`} ref={sliderRef} {...settings}>
                        {carouselInsights.map((insight) => {
                            const isPdf = insight.videoUrl.endsWith(".pdf");
                            return (
                            <div key={insight.title} className={styles.slideItem}>
                                <div className={styles.card}>
                                    {insight.videoUrl ? (
                                    <a
                                        href={insight.videoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.videoThumb}
                                    >
                                        <img src={insight.thumbnail} alt={insight.title} width={800} height={450} loading="lazy" style={{ objectFit: "cover" }} />
                                        <div className={styles.playBtn}>
                                            <div className={isPdf ? styles.pdfCircle : styles.playCircle}>
                                                {isPdf ? (
                                                    <FileText color="#ffffff" size={28} className={styles.playIcon} />
                                                ) : (
                                                    <Play color="#ffffff" size={28} fill="currentColor" className={styles.playIcon} />
                                                )}
                                            </div>
                                        </div>
                                    </a>
                                    ) : (
                                    <div className={styles.videoThumb}>
                                        <img src={insight.thumbnail} alt={insight.title} width={800} height={450} loading="lazy" style={{ objectFit: "cover" }} />
                                    </div>
                                    )}
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardTitle}>{insight.title}</h3>
                                        <p className={styles.cardDesc}>{insight.description}</p>
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                    </Slider>
                </div>

                {insights.length > CAROUSEL_LIMIT && (
                    <div className={styles.seeAllWrap}>
                        <button
                            className={styles.seeAllBtn}
                            onClick={() => setShowAllTalks(!showAllTalks)}
                            aria-expanded={showAllTalks}
                        >
                            {showAllTalks ? "Show less" : `See all ${insights.length} talks`}
                            <ChevronDown size={18} className={showAllTalks ? styles.chevronUp : ""} />
                        </button>
                    </div>
                )}

                {showAllTalks && (
                    <div className={styles.fullList}>
                        {insights.map((talk) => {
                            const Tag = talk.videoUrl ? "a" : "div";
                            const linkProps = talk.videoUrl
                                ? { href: talk.videoUrl, target: "_blank", rel: "noopener noreferrer" }
                                : {};
                            return (
                                <Tag key={talk.title} {...linkProps} className={styles.listItem}>
                                    <span className={styles.listYear}>{talk.year}</span>
                                    <span className={styles.listTitle}>{talk.title}</span>
                                    <span className={styles.listWho}>{talk.who}</span>
                                    {talk.videoUrl && <ExternalLink size={14} className={styles.listIcon} />}
                                </Tag>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Research Papers */}
            <div id="publications" className={`${styles.container} ${styles.pubsSection}`}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Research papers</h2>
                    <p className={styles.sectionSubtitle}>Explore our research papers shaping the AI landscape</p>
                </div>

                <div className={styles.carouselWrapper}>
                    <button
                        onClick={() => pubSliderRef.current?.slickPrev()}
                        className={`${styles.navBtn} ${styles.navBtnPrev}`}
                        aria-label="Previous publication"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => pubSliderRef.current?.slickNext()}
                        className={`${styles.navBtn} ${styles.navBtnNext}`}
                        aria-label="Next publication"
                    >
                        <ChevronRight size={20} />
                    </button>

                    <Slider key={`pubs-${slidesToShow}`} ref={pubSliderRef} {...pubSettings}>
                        {carouselPapers.map((pub, index) => (
                            <div key={index} className={styles.slideItem}>
                                <a
                                    href={pub.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${styles.card} ${styles.pubLink}`}
                                >
                                    <div className={styles.pubBanner}>
                                        <div className={styles.pubBannerOverlay} />
                                        <span className={styles.venueBadge}>{pub.venue}</span>
                                        <img src={pub.thumbnail} alt={pub.title} className={styles.pubPreview} width={400} height={518} loading="lazy" />
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.pubTitle}>{pub.title}</h3>
                                        <p className={styles.pubDesc}>{pub.authors}</p>
                                        <div className={styles.pubView}>
                                            <ExternalLink size={14} />
                                            <span>View</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </Slider>
                </div>

                {papers.length > CAROUSEL_LIMIT && (
                    <div className={styles.seeAllWrap}>
                        <button
                            className={styles.seeAllBtn}
                            onClick={() => setShowAllPapers(!showAllPapers)}
                            aria-expanded={showAllPapers}
                        >
                            {showAllPapers ? "Show less" : `See all ${papers.length} papers`}
                            <ChevronDown size={18} className={showAllPapers ? styles.chevronUp : ""} />
                        </button>
                    </div>
                )}

                {showAllPapers && (
                    <div className={styles.fullList}>
                        {papers.map((paper) => (
                            <a
                                key={paper.url}
                                href={paper.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.listItem}
                            >
                                <span className={styles.listBadge}>{paper.venue}</span>
                                <span className={styles.listTitle}>{paper.title}</span>
                                <span className={styles.listWho}>{paper.authors}</span>
                                <ExternalLink size={14} className={styles.listIcon} />
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default InsightsCarousel;
