import React from "react";
import Card from "../metrum/Card";
import Typography from "../metrum/Typography";
import Heading from "../metrum/Heading";
import Link from "../metrum/Link";
import { Divider } from "@material-ui/core";
import formatDistance from "date-fns/formatDistance";
import { pl } from "date-fns/locale";
import ReactMarkdown from "react-markdown";

export interface IPodcast {
    guid: string;
    title: string;
    url: string;
    who: string;
    description: string;
    date: string;
    thumb: string;
}

type PodcastProps = IPodcast

const Podcast: React.FunctionComponent<PodcastProps> = ({ guid, title, url, who, description, date, thumb }) => {
    return (
        <article className="m-margin-bottom_16 m-display-flex m-flex-column m-flex-grow_1">
            <a href={url} title={title}>
                <img src={thumb} alt={title} className="m-display-block m-width-fluid"/>
            </a>
            <Card className="m-display-flex m-flex-column m-flex-grow_1 m-padding-bottom-0">
                <a href={url} title={title} className="m-text-decoration_none">
                    <Heading size="small" maxLines={2}>{title}</Heading>
                </a>
                <Typography className="m-padding-bottom-16">
                    {who}
                </Typography>
                <Typography className="m-flex-grow-1">
                    <ReactMarkdown>{description}</ReactMarkdown>
                </Typography>
                <Link
                    button
                    className="m-margin-top-16 m-display_block m-border-width_1 m-border-color_gray m-border-style-top_solid"
                    href={url}>
                    Watch
                </Link>
            </Card>
        </article>
    );
};

export default Podcast;
