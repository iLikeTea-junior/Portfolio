import "./assets/icons/arrow.css"
import "./Header.css"
import { motion, AnimatePresence } from "framer-motion";

import { clsx } from "clsx";
import { useState } from "react";

interface AppProps {
    songsPlaying: boolean;
}

export default function Header({ songsPlaying }: AppProps) {
    const [showExtraBg, setShowExtraBg ] = useState(true);
    const [contactsButClicked, setContactsButClicked] = useState(false);

    const [showContacts, setShowContacts] = useState(false);

    const [emailClickedOnce, setEmailClickedOnce] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);

    const gitLink = "https://github.com/iLikeTea-junior";
    const linkedInLink = "https://www.linkedin.com/in/daniel-luque-5a72a63a5/";

    function copyEmail(e) {
        if (emailCopied || emailClickedOnce) return;
        
        navigator.clipboard.writeText(e.target.innerText);

        setEmailCopied(true);
        setEmailClickedOnce(true);

        setTimeout(() => setEmailCopied(false), 3000)
        setTimeout(() => setEmailClickedOnce(false), 3450)
    }

    return (
        <>
        {songsPlaying && <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 3, delay: 2, type: "spring", bounce: 0.3 }}

            onAnimationComplete={() => setShowExtraBg(false)}
        >
        {showExtraBg && <div className="extrabg"/>}
            <button
                className={clsx("contacts", (contactsButClicked ? "clicked" : "default"))}
                onClick={() => {
                    setContactsButClicked(!contactsButClicked);
                    setShowContacts(!showContacts);
                }}
            >
                Contacts
                <div
                    className="gg-chevron-double-down-o"
                    style={{
                        rotate: contactsButClicked ? "180deg" : "0deg"
                    }}
                />
            </button>

            <AnimatePresence>
            {showContacts && (
                <motion.table
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut"}}
                    exit={{ opacity: 0, y: -20 }}
                    style={{ transformOrigin: "top"}}
                >
                    <tr onClick={copyEmail} style={{ cursor: "pointer" }}><td>bopnoname@gmail.com</td></tr>
                    <tr><td><a href={gitLink} target="_blank">Github</a></td></tr>
                    <tr><td><a href={linkedInLink} target="_blank">LinkedIn</a></td></tr>
                </motion.table>
            )}
            </AnimatePresence>

        </motion.header>}
        <AnimatePresence>
            {emailCopied && <motion.div
                className="email-copied"
                initial={{ y: -105 }}
                animate={{ y: 10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                exit={{ y: -105 }}
            >
                Email Copied!
            </motion.div>}
        </AnimatePresence>
        </>
    )
}