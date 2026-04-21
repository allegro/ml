import '../styles/global.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const CANONICAL_HOST = "ai.allegro.tech";

const App = ({ Component, pageProps }) => {
    if (typeof window !== "undefined" && window.location.hostname !== CANONICAL_HOST) {
        window.location.replace(`https://${CANONICAL_HOST}${window.location.pathname}`);
        return null;
    }
    return <Component {...pageProps} />;
};

export default App;
