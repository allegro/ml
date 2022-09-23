import React from "react";
import Card from "../metrum/Card";
import Typography from "../metrum/Typography";
import Link from "../metrum/Link";
import formatDistance from "date-fns/formatDistance";
import { pl } from "date-fns/locale";
import Heading from "../metrum/Heading";
import * as Icons from "react-icons/fa";

import ReactMarkdown from "react-markdown";

export interface IOpenSource {
    name: string;
    description: string;
    url: string;
    icon: string;
}

type OpenSourceProps = IOpenSource

const DynamicFaIcon = ({ name }) => {
    const IconComponent = Icons[name];
    if (!IconComponent) { // Return a default one
      return <Icons.FaProjectDiagram />;
    }
    return <IconComponent />;
  };

const OpenSource: React.FunctionComponent<OpenSourceProps> = ({ name, url, description, icon }) => {
    return (
        <article className="m-margin-bottom_16 m-display-flex m-flex-column m-flex-grow_1">
            <Card className="m-display-flex m-flex-column m-flex-grow_1 m-padding-bottom-0">
                <a href={url} title={name} className="m-text-decoration_none m-border-style-bottom_solid m-border-width_1 m-border-color_gray">
                    <Heading size="medium" maxLines={1} style={{display: 'flex'}}><div style={{marginRight: 10}}><DynamicFaIcon name={icon}/></div>{name}</Heading>
                </a>
                <Typography as="div" className="m-flex-grow-1">
                    <ReactMarkdown>{description}</ReactMarkdown>
                </Typography>
                <Link
                    button
                    className="m-margin-top-16 m-display_block m-border-width_1 m-border-color_gray m-border-style-top_solid"
                    href={url}>
                    Try it!
                </Link>
            </Card>
        </article>
    );
};

export default OpenSource;
