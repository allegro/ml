import React from "react";
import styles from "./Footer.module.css";
import { handleAnchorClick } from "../utils/scroll";
import { default as navData } from "../data/navigation.json";

const footerNavLinks = [...navData.items, ...navData.footerExtra];

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
                        {footerNavLinks.map(({ label, target }) => (
                            <li key={label}>
                                <a href={`#${target}`} className={styles.linkBtn} onClick={(e) => handleAnchorClick(e, target)}>
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className={styles.socialTitle}>Connect</h3>
                    <div className={styles.socialIcons}>
                        {navData.socialLinks.map(({ iconUrl, label, url }) => (
                            <a
                                key={label}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label={label}
                            >
                                <img src={iconUrl} alt={label} width={20} height={20} className={styles.socialIcon} />
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
