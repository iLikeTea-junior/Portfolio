import "./IntroSection.css";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface AppProps {
    songsPlaying: boolean
}

export default function IntroSection({ songsPlaying }: AppProps) {

    const FISH_POSITIONS = [
        {iniB: '300px', iniL: '1200px', aniT: '-300px', aniL: '0px'},
        {iniB: '300px', iniL: '500px', aniT: '100px', aniL: '-300px'},
        {iniB: '300px', iniL: '1900px', aniT: '-300px', aniL: '600px'},
        {iniB: '300px', iniL: '2700px', aniT: '-300px', aniL: '1200px'},
    ]
    const familyList = ["Commissioner", "Pixelify Sans", "Tektur", "Send Flowers"]

    const [descIsVisible, setDescIsVisible] = useState(false);
    
    const fontIdx = useRef<number>(0);
    const [fontForName, setFontForName] = useState(familyList[0]);
    
    const fishId = useRef<number>(0);
    const [fishes, setFishes] = useState<{id: number, iniB: string, iniL: string, aniT: string, aniL: string}[]>([]);

    useEffect(() => {
        if (!descIsVisible) return;

        let timeout: ReturnType<typeof setTimeout>;

        const getRandomFishPos = () => {
            return FISH_POSITIONS[Math.floor(Math.random() * FISH_POSITIONS.length)]
        }

        const loop = () => {
            timeout = setTimeout(() => {
                setFishes(prevFishes => {
                    const newFishes = [
                        ...prevFishes,
                        {
                            id: fishId.current++,
                            ...getRandomFishPos()
                        }
                    ]
                    return newFishes.filter((fish, idx, self) => idx === self.findIndex((f) => f.iniL === fish.iniL));
                });
                loop();
            }, Math.floor(Math.random() * Math.floor(1000 / 250) + 1) * 250)
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                clearTimeout(timeout);
                setFishes([]);
            } else {
                loop();
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);
        loop();

        return () => {
            clearTimeout(timeout);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };

    }, [descIsVisible])
    
    useEffect(() => {
        if (!descIsVisible) return;
        let timeout: ReturnType<typeof setTimeout>;
        const loop = () => {
            timeout = setTimeout(() => {
                setFontForName(familyList[fontIdx.current % familyList.length]);
                fontIdx.current++;
                loop();
            }, 5000)
        }
        
        loop();
        return () => clearTimeout(timeout);
        
    }, [descIsVisible])
    
    return (
        songsPlaying && <motion.section
            className="about-me"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, delay: 2 }}
            onAnimationComplete={() => setDescIsVisible(true)}
        >
            <motion.img
                id="profile"
                src="/src/assets/ProfilePic2.png"
                alt="Profile Picture"

                style={{ zIndex: 1 }}
                animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            />

            {fishes.map(fish => (
                <motion.div
                    key={fish.id}
                    className="fishes"
                    initial={{ bottom: fish.iniB, left: fish.iniL }}
                    animate={{ top: fish.aniT, left: fish.aniL }}
                    transition={{ duration: Math.floor(Math.random() * (7 - 4 + 1) + 4), ease: "easeOut" }}

                    onAnimationComplete={() => {
                        setFishes(prev => prev.filter(f => f.id !== fish.id)); // i was here
                    }}
                />
                ))}


            <div className="description" style={{ width: "425px", zIndex: 1}}>
                <h2 className="small-intro">Hello, my name is
                    <span className="name-container">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={fontForName}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                exit={{ opacity: 0 }}
                                className="name"
                                style={{
                                    fontFamily: fontForName
                                }}
                            >
                                Daniel
                            </motion.span>
                        </AnimatePresence>
                    </span>
                </h2>

                <p className="description">
                    I am a Junior Frontend Developer from the Netherlands.
                </p>
            </div>
        </motion.section>
    )
}