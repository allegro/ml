import React from "react";
import Card from "../metrum/Card";
import Typography from "../metrum/Typography";
import Link from "../metrum/Link";
import formatDistance from "date-fns/formatDistance";
import { pl } from "date-fns/locale";
import Heading from "../metrum/Heading";

export interface IEvent {
    authors: string;
    date: string;
    paper_url: string;
    accepted_at: string;
    paper_title: string;
}

type EventProps = IEvent

const Event: React.FunctionComponent<EventProps> = ({ authors, date, paper_url, accepted_at, paper_title }) => {
    return (
        <div
            className="m-margin-bottom_16 m-display-flex m-flex-direction_column m-flex-direction_row_sm m-padding-bottom_0">
            <a href={paper_url} title={paper_title} className="m-display_none m-display_block_lg"
               style={{ backgroundColor: '#fd4a02' }}>
                <img width="218" src="images/event.png" alt={paper_title}/>
            </a>
            <Card as="article"
                  className="m-display-flex m-flex-direction_column m-padding-bottom_0 m-flex_1 m-flex-justify_between">
                <a href={paper_url} title={paper_title} className="m-text-decoration_none">
                    <Heading size="medium" maxLines={2}>{paper_title}</Heading>
                </a>
                <Typography as="time">
                    {date}, {accepted_at}
                </Typography>
                <Typography as="time" className="m-padding-top-8">
                    {authors}
                </Typography>
                <Link button
                      className="m-margin-top-16 m-display_block m-border-width_1 m-border-color_gray m-border-style-top_solid"
                      href={paper_url}>
                    Szczegóły
                </Link>
            </Card>
        </div>
    );
};

export default Event;
