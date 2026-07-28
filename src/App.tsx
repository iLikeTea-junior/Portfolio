import CD from "./CD.tsx"
import Header from "./Header.tsx";
import IntroSection from "./IntroSection.tsx";

import { useState, useEffect } from "react";

export default function App() {

    const [songsPlaying, setSongsPlaying] = useState(false);
    useEffect(() => {
        if (songsPlaying) {
            document.body.classList.add("songs-playing");
        } else {
            document.body.classList.remove("songs-playing");
        }
    }, [songsPlaying])

    return (
        <main className="app-layout">
        {songsPlaying && <div className="bgExpansion"/>} 
            <Header songsPlaying={songsPlaying}/>
            <IntroSection songsPlaying={songsPlaying} />
            <CD songsArePlaying={() => setSongsPlaying(true)}/>
        </main>
    )
}