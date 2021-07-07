const path = require('path');
const fs = require('fs');

import {default as papers} from "../data/publications.json";
import {default as vid} from "../data/presentations.json";
import {default as open_source} from "../data/open-source.json";
import {default as teams} from "../data/projects.json";

import React from 'react';
import Head from "next/head";
import Parser from 'rss-parser';
import Post, { IAuthor, IPost } from "../components/Post";
import Header from "../components/Header";
import Grid from "../metrum/Grid";
import Container from '../metrum/Container';
import Heading from "../metrum/Heading";
import Footer from "../components/Footer";
import Job, { IJob } from "../components/Job";
import Link from "../metrum/Link";
import Event, { IEvent } from "../components/Event";
import Podcast, { IPodcast } from "../components/Podcast";
import OpenSource, { IOpenSource } from "../components/OpenSource";
import Paper, { IPaper } from "../components/Paper";
import Project, { IProject } from "../components/Projects";

import Tracking from "../components/Tracking";

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
                      content="Allegro Tech to miejsce, w którym nasi inżynierowie dzielą się wiedzą oraz case study z wybranych projektów w firmie - w formie artykułów, podcastów oraz eventów."/>
                <title>Allegro ML Research</title>
                <meta property="og:site_name" content="Allegro ML research"/>
                <meta property="og:title" content="Allegro ML research"/>
                <meta property="og:url" content="https://ml.allegro.tech"/>
                <meta property="og:type" content="site"/>
                <meta property="og:image" content="https://ml.allegro.tech/images/allegro-ml-research.svg"/>
                <link rel="shortcut icon" href="favicon.ico"/>
                <link rel="canonical" href="https://ml.allegro.tech" itemProp="url"/>
                <link rel="preload" href="images/splash.jpg" as="image" />
                {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-1M1FJ5PXWW"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-1M1FJ5PXWW');
                `
                }}>
                </script> */}
            </Head>
            <Header/>
            <Container className="m-padding-top-24">
                <Heading size="xlarge" id="teams" className="m-padding-left-24 m-padding-right-24">Teams</Heading>
                <Grid>
                    {teams.map(team => (
                        <Grid.Col size={12} smSize={6} xlSize={4}
                                  className="m-display-flex m-flex-direction_column">
                            <Project {...team}/>
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>
            {/* <Container className="m-padding-top-24">
                <Heading size="xlarge" className="m-padding-left-24 m-padding-right-24">Blog</Heading>
                <Grid>
                    {posts.map(post => (
                        <Grid.Col key={post.guid} size={12} smSize={6} xlSize={3}
                                  className="m-display-flex m-flex-direction_column">
                            <Post {...post} />
                        </Grid.Col>
                    ))}
                </Grid>
                <Link
                    button
                    className="m-display_block m-margin-bottom_8 m-width_100"
                    href="https://blog.allegro.tech">
                    Zobacz więcej wpisów
                </Link>
            </Container> */}
            <Container className="m-padding-top-24">
                <Heading size="xlarge" id="presentations" className="m-padding-left-24 m-padding-right-24">Talks</Heading>
                <Grid>
                    {videos.map(podcast => (
                        <Grid.Col key={podcast.guid} size={12} smSize={6} xlSize={3}
                                  className="m-display-flex m-flex-direction_column">
                            <Podcast {...podcast}/>
                        </Grid.Col>
                    ))}
                    {videos2.map(podcast => (
                        <Grid.Col key={podcast.guid} size={12} smSize={6} xlSize={3}
                                  className="m-display-flex m-flex-direction_column">
                            <Podcast {...podcast}/>
                        </Grid.Col>
                    ))}
                </Grid>
                {/* <Link
                    button
                    className="m-display_block m-margin-bottom_8 m-width_100"
                    href="">
                    See more videos
                </Link> */}
            </Container>
            <Container className="m-padding-top-24">
                <Heading size="xlarge" id="open-source" className="m-padding-left-24 m-padding-right-24">Open-Source</Heading>
                <Grid>
                    {open_source.map(os_project => (
                        <Grid.Col size={12} smSize={6} xlSize={4}
                                  className="m-display-flex m-flex-direction_column">
                            <OpenSource {...os_project}/>
                        </Grid.Col>
                    ))}
                </Grid>
                {/* <Link
                    button
                    className="m-display_block m-margin-bottom_8 m-width_100"
                    href="https://podcast.allegro.tech">
                    See more videos
                </Link> */}
            </Container>
            <Container className="m-padding-top-24">
                <Heading size="xlarge" id="publications" className="m-padding-left-24 m-padding-right-24">Publications</Heading>
                <Container>
                    {papers.map(event => (
                        <Paper {...event}/>
                    ))}
                </Container>
                {/* <Link
                    button
                    className="m-display_block m-margin-bottom_8 m-width_100"
                    href="https://www.meetup.com/allegrotech/events/">More of what we've published</Link> */}
            </Container>
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
            </Container>
            <Footer/>
            <Tracking/>
        </React.Fragment>
    );
}

export async function getStaticProps() {
    type CustomItem = { authors: IAuthor[] };
    const parser: Parser<any, CustomItem> = new Parser({ customFields: { item: ['authors'] } });
    const postsPromise = parser.parseURL('https://blog.allegro.tech/feed.xml');
    const jobsPromise = fetch('https://api.smartrecruiters.com/v1/companies/allegro/postings?custom_field.58c15608e4b01d4b19ddf790=c807eec2-8a53-4b55-b7c5-c03180f2059b')
        .then(response => response.json())
        .then(json => json.content);

    const ppapers = papers.publications;
    const videos = vid.videos;
    const os_projects = open_source.projects;
    const mlr_teams = teams.teams;

    const [posts, jobs] = await Promise.all([postsPromise, jobsPromise]);

    return {
        props: {
            posts: addThumbnails(posts).items.slice(0, 4),
            jobs: jobs.slice(0, 5),
            papers: ppapers.slice(0, 10),
            videos: videos.slice(0, 4),
            videos2: videos.slice(4, 8),
            open_source: os_projects.slice(0, 4),
            teams:  mlr_teams,
        },
    }

    function addThumbnails(posts) {
        const thumbnails = fs.readdirSync('./public/images/post-headers').map(file => file.split(".").shift());
        posts.items.map(post => {
            for (let i = post.categories.length - 1; i >= 0; i--) {
                if (thumbnails.includes(post.categories[i])) {
                    post.thumbnail = path.join('images/post-headers', `${post.categories[i]}.png`);
                    return;
                }
            }
            post.thumbnail = 'images/post-headers/default.jpg';
        })
        return posts;
    }
}

export default HomePage
