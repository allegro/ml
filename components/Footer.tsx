import React from "react";
import styles from "./Footer.module.css";

const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
};

const SOCIAL_LINKS = [
    { iconUrl: "https://assets.allegrostatic.com/metrum/icon/github-6a18df1729.svg", label: "GitHub", url: "https://github.com/allegro" },
    { iconUrl: "https://assets.allegrostatic.com/metrum/icon/facebook-a2b92f9dcb.svg", label: "Facebook", url: "https://www.facebook.com/allegro.tech/" },
    { iconUrl: "https://assets.allegrostatic.com/metrum/icon/twitter-25164a58aa.svg", label: "X (Twitter)", url: "https://x.com/allegrotech" },
];

const NAV_LINKS = [
    { label: "Contributions", target: "media" },
    { label: "ML Research", target: "publications" },
    { label: "About Us", target: "areas" },
    { label: "Careers", target: "cta" },
];

const Footer: React.FunctionComponent = () => (
    <footer className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.grid}>
                <div>
                    <div className={styles.brand}>
                        <div className={styles.brandIcon}>A</div>
                        <span className={styles.brandName}>AI Hub</span>
                    </div>
                    <p className={styles.brandDesc}>
                        The driving force behind Allegro&apos;s evolution as the AI-first e-commerce leader.
                    </p>
                </div>

                <div>
                    <h3 className={styles.linksTitle}>Quick Links</h3>
                    <ul className={styles.linksList}>
                        {NAV_LINKS.map(({ label, target }) => (
                            <li key={label}>
                                <button className={styles.linkBtn} onClick={() => scrollToSection(target)}>
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className={styles.socialTitle}>Connect</h3>
                    <div className={styles.socialIcons}>
                        {SOCIAL_LINKS.map(({ iconUrl, label, url }) => (
                            <a
                                key={label}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label={label}
                            >
                                <img src={iconUrl} alt={label} width={20} height={20} style={{ filter: 'brightness(0) invert(1)' }} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>Proudly built by AI Hub engineers</p>
            </div>
        </div>
    </footer>
);

export default Footer;
