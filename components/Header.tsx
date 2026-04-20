import React from "react";
import styles from "./Header.module.css";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
    { label: 'Contributions', target: 'media' },
    { label: 'ML Research', target: 'publications' },
    { label: 'About Us', target: 'areas' },
];

const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
};

const Header: React.FunctionComponent = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);

    const handleNav = (target: string) => {
        scrollToSection(target);
        setMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <a href="/" className={styles.logoGroup}>
                    <img src="images/allegro-logo.png" alt="Allegro" className={styles.logoImg} />
                    <span className={styles.logoText}>AI Hub</span>
                </a>

                <div className={styles.desktopNav}>
                    {NAV_ITEMS.map(({ label, target }) => (
                        <button key={label} className={styles.navLink} onClick={() => handleNav(target)}>
                            {label}
                        </button>
                    ))}
                    <button className={styles.joinBtn} onClick={() => handleNav('cta')}>
                        Join Us
                    </button>
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
                    {NAV_ITEMS.map(({ label, target }) => (
                        <button key={label} className={styles.mobileNavLink} onClick={() => handleNav(target)}>
                            {label}
                        </button>
                    ))}
                    <button className={styles.mobileJoinBtn} onClick={() => handleNav('cta')}>
                        Join Us
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
