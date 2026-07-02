import React from "react";
import { FlaskConical, BrainCircuit, BarChart2, Code2, Sparkles, ExternalLink } from "lucide-react";
import styles from "./FinalCTA.module.css";

type RoleType = "Data Scientist" | "Research Engineer" | "Product Analyst" | "Engineer" | "Other";

export interface IRole {
    title: string;
    type: RoleType;
    link: string;
}

interface FinalCTAProps {
    roles: IRole[];
}

const roleTypeConfig: Record<RoleType, { icon: React.ElementType; bgClass: string; textClass: string }> = {
    "Data Scientist":    { icon: FlaskConical,  bgClass: styles.bgViolet,  textClass: styles.textViolet },
    "Research Engineer": { icon: BrainCircuit,  bgClass: styles.bgBlue,    textClass: styles.textBlue },
    "Product Analyst":   { icon: BarChart2,     bgClass: styles.bgEmerald, textClass: styles.textEmerald },
    "Engineer":          { icon: Code2,         bgClass: styles.bgOrange,  textClass: styles.textOrange },
    "Other":             { icon: Sparkles,      bgClass: styles.bgGray,    textClass: styles.textGray },
};

const FinalCTA: React.FunctionComponent<FinalCTAProps> = ({ roles }) => {
    if (roles.length === 0) return null;

    const roleTypes = Object.entries(roleTypeConfig) as [RoleType, typeof roleTypeConfig[RoleType]][];

    return (
        <section id="cta" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Join Our Team</h2>
                    <p className={styles.subtitle}>
                        We&apos;re looking for talented individuals who are passionate about innovation across Data Science, ML Research, Product Analysis and Engineering. Help us shape the future of AI-powered e-commerce.
                    </p>
                </div>

                <div className={styles.legend}>
                    {roleTypes.map(([type, cfg]) => {
                        const Icon = cfg.icon;
                        return (
                            <span key={type} className={`${styles.legendBadge} ${cfg.bgClass}`}>
                                <Icon size={14} />
                                {type}
                            </span>
                        );
                    })}
                </div>

                <div className={styles.grid}>
                    {roles.map((role, idx) => {
                        const cfg = roleTypeConfig[role.type as RoleType] || roleTypeConfig["Other"];
                        const Icon = cfg.icon;
                        return (
                            <a
                                key={idx}
                                href={role.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.roleCard}
                            >
                                <div className={styles.roleCardTop}>
                                    <div className={`${styles.roleIconBox} ${cfg.bgClass}`}>
                                        <Icon className={cfg.textClass} size={20} />
                                    </div>
                                    <ExternalLink size={16} className={styles.externalIcon} />
                                </div>
                                <div>
                                    <p className={styles.roleTitle}>{role.title}</p>
                                    <p className={`${styles.roleType} ${cfg.textClass}`}>{role.type}</p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
