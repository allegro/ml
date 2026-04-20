import React, { useRef, useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Play, FileText, ExternalLink } from "lucide-react";
import styles from "./InsightsCarousel.module.css";

export interface IInsight {
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
}

export interface IResearchPaper {
    title: string;
    description: string;
    url: string;
    venue: string;
}

interface InsightsCarouselProps {
    insights: IInsight[];
    papers: IResearchPaper[];
}

function useSlidesToShow() {
    const getCount = useCallback(() => {
        if (typeof window === "undefined") return 1;
        const w = window.innerWidth;
        if (w < 640) return 1;
        if (w < 1024) return 2;
        return 3;
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
    const slidesToShow = useSlidesToShow();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    const pubSettings = {
        ...settings,
        autoplaySpeed: 6000,
    };

    return (
        <section id="media" className={styles.section}>
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
                        {insights.map((insight, index) => (
                            <div key={index} className={styles.slideItem}>
                                <div className={styles.card}>
                                    <a
                                        href={insight.videoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.videoThumb}
                                    >
                                        <img src={insight.thumbnail} alt={insight.title} />
                                        <div className={styles.playBtn}>
                                            <div className={styles.playCircle}>
                                                <Play color="#ffffff" size={28} fill="currentColor" style={{ marginLeft: 2 }} />
                                            </div>
                                        </div>
                                    </a>
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardTitle}>{insight.title}</h3>
                                        <p className={styles.cardDesc}>{insight.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
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
                        {papers.map((pub, index) => (
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
                                        <div className={styles.pubIcon}>
                                            <FileText color="#ffffff" size={28} />
                                        </div>
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.pubTitle}>{pub.title}</h3>
                                        <p className={styles.pubDesc}>{pub.description}</p>
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
            </div>
        </section>
    );
};

export default InsightsCarousel;
