import React from "react";
import styles from "./Hero.module.css";
import { ArrowRight, Info } from "lucide-react";
import { scrollToSection } from "../utils/scroll";
import { default as siteConfig } from "../data/site-config.json";

const Hero: React.FunctionComponent = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroBg}>
                <img src={siteConfig.assets.heroBg} alt="" width={1920} height={1080} {...{ fetchpriority: "high" } as any} />
            </div>
            <div className={styles.heroContent}>
                <div className={styles.heroText}>
                    <h1 className={styles.heroTitle}>AI Hub</h1>
                    <p className={styles.heroDescription}>
                        Real-time ranking. 50,000 ML models. Autonomous AI agents.
                    </p>
                    <p className={styles.heroWelcome}>
                        If these aren&apos;t just buzzwords to you — welcome home.
                    </p>
                    <div className={styles.heroActions}>
                        <button className={styles.btnOutline} onClick={() => scrollToSection('areas')}>
                            Learn more about Us
                            <Info size={20} />
                        </button>
                        <button className={styles.btnOrange} onClick={() => scrollToSection('cta')}>
                            See open roles
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
