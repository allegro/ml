import React from "react";
import Card from "../metrum/Card";
import Typography from "../metrum/Typography";
import Heading from "../metrum/Heading";
import Link from "../metrum/Link";
import { Divider } from "@material-ui/core";
import formatDistance from "date-fns/formatDistance";
import { pl } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import * as Icons from "react-icons/fa";

export interface IProject {
    name: string;
    description: string;
    icon: string;
}

type ProjectProps = IProject

const DynamicFaIcon = ({ name }) => {
    const IconComponent = Icons[name];
    if (!IconComponent) { // Return a default one
      return <Icons.FaProjectDiagram />;
    }
    return <IconComponent />;
  };

const Project: React.FunctionComponent<ProjectProps> = ({ name, description, icon }) => {
    return (
        <article className="m-margin-bottom_16 m-display-flex m-flex-column m-flex-grow_1">
            <Card className="m-display-flex m-flex-column m-flex-grow_1 m-padding-bottom-0">
                <Heading size="medium" maxLines={1}><DynamicFaIcon name={icon} /> {name}</Heading>
                <Typography className="m-flex-grow-1">
                    <ReactMarkdown>{description}</ReactMarkdown>
                </Typography>
            </Card>
        </article>
    );
};

export default Project;
