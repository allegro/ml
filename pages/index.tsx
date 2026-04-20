import { default as insightsData } from "../data/insights.json";
import { default as papersData } from "../data/research-papers.json";
import { default as pillarsData } from "../data/pillars.json";
import { default as rolesData } from "../data/roles.json";
import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import InsightsCarousel, { IInsight, IResearchPaper } from "../components/InsightsCarousel";
import FourPillars, { IPillar } from "../components/FourPillars";
import FinalCTA, { IRole } from "../components/FinalCTA";
import Footer from "../components/Footer";
import Tracking from "../components/Tracking";

interface HomePageProps {
    insights: IInsight[];
    papers: IResearchPaper[];
    pillars: IPillar[];
    roles: IRole[];
}

const HomePage: React.FunctionComponent<HomePageProps> = ({ insights, papers, pillars, roles }) => {
    return (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta
                    name="description"
                    content="Allegro AI Hub — the driving force behind Allegro's evolution as the AI-first e-commerce leader. Real-time ranking, recommendations, ML research and more."
                />
                <title>Allegro AI Hub</title>
                <meta property="og:site_name" content="Allegro AI Hub" />
                <meta property="og:title" content="Allegro AI Hub" />
                <meta property="og:url" content="https://ml.allegro.tech" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://ml.allegro.tech/images/hero-bg.png" />
                <link rel="shortcut icon" href="favicon.ico" />
                <link rel="canonical" href="https://ml.allegro.tech" itemProp="url" />
                <link rel="preload" href="images/hero-bg.png" as="image" />
                <script defer data-domain="ml.allegro.tech" src="https://plausible.io/js/script.js"></script>
            </Head>
            <Header />
            <Hero />
            <InsightsCarousel insights={insights} papers={papers} />
            <FourPillars pillars={pillars} />
            <FinalCTA roles={roles} />
            <Footer />
            <Tracking />
        </React.Fragment>
    );
};

export async function getStaticProps() {
    return {
        props: {
            insights: insightsData.insights,
            papers: papersData.papers,
            pillars: pillarsData.pillars,
            roles: rolesData.roles,
        },
    };
}

export default HomePage;
