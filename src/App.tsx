import CD from "./CD.tsx"
import Header from "./Header.tsx";
import IntroSection from "./IntroSection.tsx";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function App() {
    const [songsPlaying, setSongsPlaying] = useState(false);
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

    return (
        <main className="app-layout">
        {songsPlaying && <motion.div
            className="bgExpansion"
            onAnimationEnd={removeDivAniBg}
        />} 
            <Header songsPlaying={songsPlaying}/>
            <IntroSection songsPlaying={songsPlaying} />
            <CD songsArePlaying={() => setSongsPlaying(true)}/>

            <div className="goto-aboutme">About me</div>
        </main>
    )
}