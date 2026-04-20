import React from "react";
import styles from "./Header.module.css";
import { Menu, X } from "lucide-react";
import { handleAnchorClick, scrollToSection } from "../utils/scroll";
import { default as navData } from "../data/navigation.json";
import { default as siteConfig } from "../data/site-config.json";

const Header: React.FunctionComponent = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);

    const handleMobileNav = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
        handleAnchorClick(e, target);
        setMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <a href="/" className={styles.logoGroup}>
                    <img src={siteConfig.assets.logo} alt="Allegro" className={styles.logoImg} />
                    <span className={styles.logoText}>AI Hub</span>
                </a>

                <div className={styles.desktopNav}>
                    {navData.items.map(({ label, target }) => (
                        <a key={label} href={`#${target}`} className={styles.navLink} onClick={(e) => handleAnchorClick(e, target)}>
                            {label}
                        </a>
                    ))}
                    <a href={`#${navData.cta.target}`} className={styles.joinBtn} onClick={(e) => handleAnchorClick(e, navData.cta.target)}>
                        {navData.cta.label}
                    </a>
                </div>

                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {menuOpen && (
                <div className={styles.mobileNav}>
                    {navData.items.map(({ label, target }) => (
                        <a key={label} href={`#${target}`} className={styles.mobileNavLink} onClick={(e) => handleMobileNav(e, target)}>
                            {label}
                        </a>
                    ))}
                    <a href={`#${navData.cta.target}`} className={styles.mobileJoinBtn} onClick={(e) => handleMobileNav(e, navData.cta.target)}>
                        {navData.cta.label}
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;
