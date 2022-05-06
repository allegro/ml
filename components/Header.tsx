import React from "react";
import styles from "./Header.module.css";
import Card from "../metrum/Card";
import Container from "../metrum/Container";
import Link from "../metrum/Link";
import classnames from "clsx";
import Heading from "../metrum/Heading";
import Typography from "../metrum/Typography";
import List from "../metrum/List";
import { Scrollchor } from 'react-scrollchor';

const MENU_ITEMS = [
    // { label: 'Blog', url: 'https://blog.allegro.tech' },
    { label: 'Our projects', url: '#teams' },
    { label: 'Talks', url: '#presentations' },
    { label: 'Blog', url: '#blog' },
    { label: 'Open Source', url: '#open-source' },
    { label: 'Publications', url: '#publications' },
    { label: 'Jobs', url: 'https://praca.allegro.pl' }

];

const ICON_CLOSE = 'https://assets.allegrostatic.com/metrum/icon/x-1a6f095eb2.svg';
const ICON_MENU = 'https://assets.allegrostatic.com/metrum/icon/menu-23e046bf68.svg';

const Header = () => {
    const [menuVisible, setMenuVisible] = React.useState(false);
    const isMobile = typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(min-width: 992px)').matches;

    React.useEffect(() => {
        document.body.style.overflow = isMobile && menuVisible ? 'hidden' : '';
    }, [menuVisible, isMobile]);

    const icon = menuVisible ? ICON_CLOSE : ICON_MENU;

    return (
        <React.Fragment>
            <Card as="header" className={styles.navbar}>
                <Container as="nav" className="m-display-flex m-flex-justify-between m-flex-items-center">
                    <a href="/"><img src="images/allegro-ml-research.svg" alt="Allegro ML Research" height={45}/></a>
                    <div>
                        <List
                            className={classnames("m-display-flex@lg", !menuVisible && "m-display-none", menuVisible && styles.menu)}>
                            {MENU_ITEMS.map(({ label, url }) => {
                                if (url.startsWith("http")) {
                                    return (
                                        <List.Item key={label} className="m-margin-left-16@lg"><Link href={url} target="_blank" signal
                                        className="m-display-block m-display-inline@lg m-padding-left-16 m-padding-right-16 m-padding-top-16 m-padding-bottom-16 m-padding-left-0@lg m-padding-top-0@lg m-padding-right-0@lg m-padding-bottom-0@lg">{label}</Link></List.Item>  
                                    )
                                } else {
                                 return (
                                <List.Item key={label} className="m-margin-left-16@lg"><Scrollchor to={url}
                                        className="m-display-block m-display-inline@lg m-padding-left-16 m-padding-right-16 m-padding-top-16 m-padding-bottom-16 m-padding-left-0@lg m-padding-top-0@lg m-padding-right-0@lg m-padding-bottom-0@lg m-white-space_nowrap m-cursor_pointer m-overflow_hidden  m-padding-top_0 m-padding-bottom_0 m-outline-style_dotted--focus m-outline-width_2 m-outline-color_teal m-outline-offset_n2 m-button m-box_border m-text-align_center m-display_inline-block m-link--signal">{label}</Scrollchor></List.Item>
                                )}
                                }
                            )}
                        </List>
                        <button onClick={() => setMenuVisible(!menuVisible)}
                                className="m-display-none@lg m-height_40 m-line-height_40 m-border-style-top_none m-border-style-right_none m-border-style-bottom_none m-border-style-left_none m-border-radius-top-left_2 m-border-radius-top-right_2 m-border-radius-bottom-left_2 m-border-radius-bottom-right_2 m-cursor_pointer m-overflow_hidden m-appearance_none m-padding-left_4 m-padding-right_4 m-padding-top_4 m-padding-bottom_4 m-outline-style_dotted--focus m-outline-width_2 m-outline-color_teal m-outline-offset_n2 m-button"
                                style={{ background: 'transparent' }}
                                aria-label={menuVisible ? 'Zamknij menu' : 'Otwórz menu'}
                        >
                            <img src={icon} alt="" className="m-icon" width={32} height={32} />
                        </button>
                    </div>
                </Container>
            </Card>
            <div className={styles.hero}>
                <Container className={classnames("m-display-flex m-flex-column m-flex-justify-end m-padding-bottom_24 ", styles.image)}>
                    <Card className="m-color-bg_desk m-color-bg_card m-width-max_768" transparent>
                        <Heading size="hero">About us</Heading>
                        <Typography>
                        Machine Learning Research is Allegro’s R&D lab created to develop and apply state-of-the-art machine learning methods, helping Allegro grow and innovate with artificial intelligence. Beyond bringing AI to
production, we are committed to advance the understanding of machine learning through open collaboration with the scientific community. </Typography>
                    </Card>
                </Container>
            </div>
        </React.Fragment>

    )
};

export default Header;
