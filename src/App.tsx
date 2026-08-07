import CD from "./CD.tsx"
import Header from "./Header.tsx";
import IntroSection from "./IntroSection.tsx";
import AboutSection from "./AboutSection.tsx";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

export default function App() {
    const pageSections = ["Introductions", "About me", "Projects"]

    const sectionIdx = useRef(0);
    const aboutMeSectionRef = useRef<HTMLElement>(null);
    
    const [aboutMeButtonHovered, setAboutMeButtonHovered] = useState(false);
    const [currentSection, setCurrentSection] = useState("Introduction");
    const [nextSection, setNextSection] = useState("About me");

    const hoverProps = {
        className: clsx(aboutMeButtonHovered && "hovered"),
        onMouseOver: () => setAboutMeButtonHovered(true),
        onMouseLeave: () => setAboutMeButtonHovered(false),
        onClick: () => goToNextSection()
    }
    
    const [songsPlaying, setSongsPlaying] = useState(true); // put this back to false to show the CD component.
    const [backgroundFinished, setBackGroundFinished] = useState(false);

    useEffect(() => {
        if (songsPlaying) {
            document.body.classList.add("songs-playing");
        } else {
            document.body.classList.remove("songs-playing");
        }
    }, [songsPlaying])

    function removeDivAniBg() {
        document.querySelector(".bgExpansion")?.remove();
        document.body.style.backgroundColor = "rgb(230, 255, 255)";
    }

    function goToNextSection() {
        console.log("the button has been clicked");
        sectionIdx.current++;
        setCurrentSection(pageSections[sectionIdx.current]);
        aboutMeSectionRef.current?.scrollIntoView({ behavior: "smooth" })
        setNextSection(pageSections[sectionIdx.current + 1])
    }

    return (
        <main className="app-layout">
        {songsPlaying && <motion.div
            className="bgExpansion"
            onAnimationEnd={() => {
                removeDivAniBg();
                setBackGroundFinished(true);
            }}
        />} 
            <Header songsPlaying={songsPlaying}/>
            <div className="sections-container">
                {currentSection === "Introduction" && <IntroSection songsPlaying={songsPlaying}/>}
                {currentSection === "About me" && <AboutSection ref={aboutMeSectionRef}/>}
            </div>
            {/* <CD songsArePlaying={() => setSongsPlaying(true)}/> */}

            {backgroundFinished && <motion.div
                className="goto-aboutme"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: "linear" }}
            >
                <p {...hoverProps}>{nextSection}</p>
                <div style={{ cursor: "pointer" }} {...hoverProps}/>
            </motion.div>}
        </main>
    )
}