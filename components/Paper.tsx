import React from "react";
import Card from "../metrum/Card";
import Typography from "../metrum/Typography";
import Link from "../metrum/Link";
import Heading from "../metrum/Heading";

export interface IPaper {
    authors: string;
    date: string;
    paper_url: string;
    accepted_at: string;
    paper_title: string;
}


type PaperProps = IPaper

const Paper: React.FunctionComponent<PaperProps> = ({ authors, date, paper_url, accepted_at, paper_title }) => {
    return (
        <Card className="m-margin-bottom_16 m-display-flex m-flex-justify_between m-flex-items-center m-flex-direction_column m-flex-direction_row_md m-padding-bottom-0 m-padding-top-0">
            <Typography className="m-color-gray">{date}</Typography>
            <Card as="article" className="m-margin-bottom_16 m-flex-column m-flex-grow_1 m-padding-bottom-0">
                <Heading size="small" className="m-margin-bottom_0_sm m-flex-grow_1">{paper_title}</Heading>
                <Typography>
                    Authors: {authors}
                </Typography>
                <Typography>
                    Accepted at: {accepted_at}
                </Typography>
            </Card>
            <Link button href={paper_url}>Read</Link>
        </Card>
    );
};

export default Paper;
