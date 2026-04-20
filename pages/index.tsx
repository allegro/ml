import { default as insightsData } from "../data/insights.json";
import { default as papersData } from "../data/research-papers.json";
import { default as pillarsData } from "../data/pillars.json";
import { default as rolesData } from "../data/roles.json";
import { default as siteConfig } from "../data/site-config.json";
import { default as navData } from "../data/navigation.json";
import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import InsightsCarousel, { IInsight, IResearchPaper } from "../components/InsightsCarousel";
import FourPillars, { IPillar } from "../components/FourPillars";
import FinalCTA, { IRole } from "../components/FinalCTA";
import Footer from "../components/Footer";

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
                <meta name="description" content={siteConfig.description} />
                <title>{siteConfig.siteName}</title>
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Allegro AI Hub" />
                <meta name="theme-color" content="#f97316" />
                <meta property="og:site_name" content={siteConfig.siteName} />
                <meta property="og:title" content={siteConfig.siteName} />
                <meta property="og:description" content={siteConfig.description} />
                <meta property="og:url" content={siteConfig.siteUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={siteConfig.ogImage} />
                <meta property="og:locale" content="en_US" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={siteConfig.siteName} />
                <meta name="twitter:description" content={siteConfig.description} />
                <meta name="twitter:image" content={siteConfig.ogImage} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="shortcut icon" href={siteConfig.assets.favicon} />
                <link rel="canonical" href={siteConfig.siteUrl} itemProp="url" />
                <link rel="preload" href={siteConfig.assets.heroBg} as="image" />
                <script defer data-domain={siteConfig.analytics.domain} src={siteConfig.analytics.scriptUrl}></script>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@graph": [
                                {
                                    "@type": "Organization",
                                    name: "Allegro AI Hub",
                                    url: siteConfig.siteUrl,
                                    logo: `${siteConfig.siteUrl}/${siteConfig.assets.logo}`,
                                    description: siteConfig.description,
                                    parentOrganization: {
                                        "@type": "Organization",
                                        name: "Allegro",
                                        url: "https://allegro.pl",
                                    },
                                    sameAs: navData.socialLinks.map((link) => link.url),
                                },
                                {
                                    "@type": "WebSite",
                                    name: siteConfig.siteName,
                                    url: siteConfig.siteUrl,
                                    publisher: {
                                        "@type": "Organization",
                                        name: "Allegro AI Hub",
                                    },
                                },
                            ],
                        }),
                    }}
                />
            </Head>
            <Header />
            <Hero />
            <InsightsCarousel insights={insights} papers={papers} />
            <FourPillars pillars={pillars} />
            <FinalCTA roles={roles} />
            <Footer />
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
