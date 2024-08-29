import {default as papers} from "../data/publications.json";
import {default as vid} from "../data/presentations.json";
import {default as open_source} from "../data/open-source.json";
import {default as teams} from "../data/projects.json";
import React from 'react';
import Head from "next/head";
import Post, { IPost } from "../components/Post";
import Header from "../components/Header";
import Grid from "../metrum/Grid";
import Container from '../metrum/Container';
import Heading from "../metrum/Heading";
import Footer from "../components/Footer";
import Job, { IJob } from "../components/Job";
import Link from "../metrum/Link";
import Podcast, { IPodcast } from "../components/Podcast";
import OpenSource, { IOpenSource } from "../components/OpenSource";
import Paper, { IPaper } from "../components/Paper";
import Project, { IProject } from "../components/Projects";

import Tracking from "../components/Tracking";
import axios from 'axios';
import * as cheerio from 'cheerio';

interface HomePageProps {
    posts: IPost[];
    jobs: IJob[];
    papers: IPaper[];
    videos: IPodcast[];
    videos2: IPodcast[];
    open_source: IOpenSource[];
    teams: IProject[];
}

const HomePage: React.FunctionComponent<HomePageProps> = ({ posts, jobs, papers, videos, videos2, open_source, teams }) => {
    return (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <meta name="description"
                      content="Machine Learning Research is Allegro’s R&D lab created to develop and apply state-of-the-art machine learning methods, helping Allegro grow and innovate with artificial intelligence. Beyond bringing AI to
                      production, we are committed to advance the understanding of machine learning through open collaboration with the scientific community."/>
                <title>Allegro ML Research</title>
                <meta property="og:site_name" content="Allegro ML research"/>
                <meta property="og:title" content="Allegro ML research"/>
                <meta property="og:url" content="https://ml.allegro.tech"/>
                <meta property="og:type" content="site"/>
                <meta property="og:image" content="https://ml.allegro.tech/images/allegro-ml-research.svg"/>
                <link rel="shortcut icon" href="favicon.ico"/>
                <link rel="canonical" href="https://ml.allegro.tech" itemProp="url"/>
                <link rel="preload" href="images/splash.jpg" as="image" />
                <script defer data-domain="ml.allegro.tech" src="https://plausible.io/js/script.js"></script>
            </Head>
            <Header/>
            <Container className="m-padding-top-24">
                <Heading size="xlarge" id="teams" className="m-padding-left-24 m-padding-right-24">Areas</Heading>
                <Grid>
                    {teams.map((team) => (
                        <Grid.Col key={team.name} size={12} smSize={6} xlSize={4}
                                  className="m-display-flex m-flex-direction_column">
                            <Project {...team}/>
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
            <Container className="m-padding-top-24">
                <Heading size="xlarge" id="presentations" className="m-padding-left-24 m-padding-right-24">Talks</Heading>
                <Grid>
                    {videos.map(video => (
                        <Grid.Col key={'1' + video.title} size={12} smSize={6} xlSize={3}
                                  className="m-display-flex m-flex-direction_column">
                            <Podcast {...video}/>
                        </Grid.Col>
                    ))}
                    {videos2.map(video => (
                        <Grid.Col key={'2' + video.title} size={12} smSize={6} xlSize={3}
                                  className="m-display-flex m-flex-direction_column">
                            <Podcast {...video}/>
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
            <Container className="m-padding-top-24">
                <Heading size="xlarge" id="blog" className="m-padding-left-24 m-padding-right-24">Blog</Heading>
                <Grid>
                    {posts.map(post => (
                        <Grid.Col key={post.guid} size={12} smSize={6} xlSize={3}
                                  className="m-display-flex m-flex-direction_column">
                            <Post {...post} />
                        </Grid.Col>
                    ))}
                </Grid>
                {/* <Link
                    button
                    className="m-display_block m-margin-bottom_8 m-width_100"
                    href="https://blog.allegro.tech">
                    Zobacz więcej wpisów
                </Link> */}
            </Container>
            <Container className="m-padding-top-24">
                <Heading size="xlarge" id="open-source" className="m-padding-left-24 m-padding-right-24">Open-Source</Heading>
                <Grid>
                    {open_source.map(os_project => (
                        <Grid.Col key={os_project.name} size={12} smSize={6} xlSize={4}
                                  className="m-display-flex m-flex-direction_column">
                            <OpenSource {...os_project}/>
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
            <Container className="m-padding-top-24">
                <Heading size="xlarge" id="publications" className="m-padding-left-24 m-padding-right-24">Publications</Heading>
                <Container>
                    {papers.map((event, index) => (
                        <Paper key={event.date + index} {...event}/>
                    ))}
                </Container>
            </Container>
            {
                jobs.length > 0 ? 
                    <Container className="m-padding-top-24">
                        <Heading size="xlarge" className="m-padding-left-24 m-padding-right-24">Job offers</Heading>
                        <Container>
                            {jobs.map(job => (
                                <Job key={job.id} id={job.id} name={job.name} location={job.location}/>
                            ))}
                        </Container>
                        <Link
                            button
                            className="m-display_block m-margin-bottom_8 m-width_100"
                            href="https://allegro.pl/praca">See more job offers</Link>
                    </Container> : ""
            }
            <Footer/>
            <Tracking/>
        </React.Fragment>
    );
}

export async function scrapeTechBlog(url: string) {
    let results = [];

    try {
        const response = await axios.get(url);
        const mlrPostsDomTree = cheerio.load(response.data);
        const getValue = (el, selector) => mlrPostsDomTree(el).find(selector).length
            ? mlrPostsDomTree(el).find(selector)
            : mlrPostsDomTree(el);

        mlrPostsDomTree("article")
            .each((articleIndex, articleElement) => {
                const title = getValue(articleElement, "h2 a").text().trim();
                const link = getValue(articleElement, "h2 a").attr("href")
                const date = getValue(articleElement, "span.text-sm").text().trim()
                const abstract = getValue(articleElement, "p").text().trim()
                
                let avatars = [];
                getValue(articleElement, "img").each((_, avatarElement) => {
                    avatars.push(avatarElement.attribs.src)
                })

                let authors = [];
                getValue(articleElement, "a.text-sm").each((index, authorElement) => {
                    authors.push(
                        {
                            name: authorElement.children[0].data.trim(),
                            url: "https://blog.allegro.tech" + authorElement.attribs.href,
                            photo: "https://blog.allegro.tech" + avatars[index]
                        }
                    )
                });

                results.push(
                    {
                        guid: articleIndex,
                        title: title,
                        authors: authors,
                        link: "https://blog.allegro.tech" + link,
                        pubDate: date,
                        contentSnippet: abstract
                    }
                )
            })
    }
    catch (err) {
        console.error("Error during request:", err);
        throw err;
    }

    return results
}

export async function getStaticProps() {
    const postsPagePromise = scrapeTechBlog("https://blog.allegro.tech/tag/mlr");
    const jobsPromise = fetch('https://api.smartrecruiters.com/v1/companies/allegro/postings?q=machine&limit=5')
        .then(response => response.json())
        .then(json => json.content);

    const ppapers = papers.publications;
    const videos = vid.videos;
    const os_projects = open_source.projects;
    const mlr_teams = teams.teams;

    const [posts, jobs] = await Promise.all([postsPagePromise, jobsPromise]);

    return {
        props: {
            posts: posts.slice(0, 4),
            jobs: jobs.slice(0, 5),
            papers: ppapers.slice(0, 10),
            videos: videos.slice(0, 4),
            videos2: videos.slice(4, 8),
            open_source: os_projects.slice(0, 9),
            teams:  mlr_teams,
        },
    }
}

export default HomePage
