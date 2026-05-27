import React, { useEffect, useState } from "react";
import styles from "../../components/EasterEgg.module.css";

const LINES = [
    { delay: 300, type: "prompt", text: "$ ssh admin@ai.allegro.tech" },
    { delay: 800, type: "text", text: "Connecting to 10.0.42.137..." },
    { delay: 1400, type: "text", text: "Authentication successful." },
    { delay: 2000, type: "prompt", text: "admin@ai-hub:~$ cat /etc/motd" },
    { delay: 2600, type: "ascii" },
    { delay: 3800, type: "secret" },
    { delay: 4600, type: "prompt", text: "admin@ai-hub:~$ " },
];

const ASCII_ART = `
   █████╗  ██╗    ██╗  ██╗██╗   ██╗██████╗
  ██╔══██╗ ██║    ██║  ██║██║   ██║██╔══██╗
  ███████║ ██║    ███████║██║   ██║██████╔╝
  ██╔══██║ ██║    ██╔══██║██║   ██║██╔══██╗
  ██║  ██║ ██║    ██║  ██║╚██████╔╝██████╔╝
  ╚═╝  ╚═╝ ╚═╝    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝`;

const Admin = () => {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        const timers = LINES.map((line, i) =>
            setTimeout(() => setVisibleLines(i + 1), line.delay)
        );
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.scanlines} />
            <div className={styles.flicker} />
            <div className={styles.terminal}>
                <div className={styles.titleBar}>
                    <span className={`${styles.dot} ${styles.dotRed}`} />
                    <span className={`${styles.dot} ${styles.dotYellow}`} />
                    <span className={`${styles.dot} ${styles.dotGreen}`} />
                    <span className={styles.titleText}>admin@ai-hub — zsh</span>
                </div>
                <div className={styles.body}>
                    {LINES.slice(0, visibleLines).map((line, i) => {
                        if (line.type === "ascii") {
                            return (
                                <pre
                                    key={i}
                                    className={styles.ascii}
                                    style={{ animationDelay: "0s" }}
                                >
                                    {ASCII_ART}
                                </pre>
                            );
                        }
                        if (line.type === "secret") {
                            return (
                                <div
                                    key={i}
                                    className={styles.secret}
                                    style={{ animationDelay: "0s" }}
                                >
                                    <p className={styles.secretText}>P O Z D R A W I A M Y</p>
                                    <p className={styles.secretSub}>
                                        — Allegro AI Hub team 🧡
                                    </p>
                                </div>
                            );
                        }
                        return (
                            <p
                                key={i}
                                className={styles.line}
                                style={{ animationDelay: "0s" }}
                            >
                                {line.type === "prompt" ? (
                                    <span className={styles.prompt}>{line.text}</span>
                                ) : (
                                    line.text
                                )}
                                {i === visibleLines - 1 &&
                                    i === LINES.length - 1 && (
                                        <span className={styles.cursor} />
                                    )}
                            </p>
                        );
                    })}
                </div>
                <div style={{ padding: "0 24px 16px" }}>
                    <a href="/" className={styles.backLink} style={{ animationDelay: "5s" }}>
                        {">"} cd /home — back to safety
                    </a>
                </div>
            </div>
        </div>
    );
};

export const getStaticProps = () => ({ props: {} });

export default Admin;
