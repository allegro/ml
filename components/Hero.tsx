import React from "react";
import styles from "./Hero.module.css";
import { ArrowRight, Info } from "lucide-react";

const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
};

const Hero: React.FunctionComponent = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroBg}>
                <img src="images/hero-bg.png" alt="" />
            </div>
            <div className={styles.heroContent}>
                <div className={styles.heroText}>
                    <h1 className={styles.heroTitle}>AI Hub</h1>
                    <p className={styles.heroDescription}>
                        Real-time ranking for 20M users and 300M offers.<br />
                        50,000 ML models for price optimization.<br />
                        AI agents autonomously creating thousands of content pieces.
                    </p>
                    <p className={styles.heroWelcome}>Welcome home.</p>
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
