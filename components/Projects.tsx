import React from "react";
import Card from "../metrum/Card";
import Typography from "../metrum/Typography";
import Heading from "../metrum/Heading";
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
            <Card className="m-display-flex m-flex-column m-flex-grow_1 m-padding-bottom-24">
                <Heading size="medium" maxLines={1} style={{display: 'flex'}}><div style={{marginRight: 10}}><DynamicFaIcon name={icon}/></div>{name}</Heading>
                <Typography as="div" className="m-flex-grow-1">
                    <ReactMarkdown>{description}</ReactMarkdown>
                </Typography>
            </Card>
        </article>
    );
};

export default Project;
