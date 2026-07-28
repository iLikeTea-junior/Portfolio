import './CD.css';

import cdImage from "./assets/cd.png"
import arrowImg from "./assets/image.png";
import nextButton from "./assets/nextButton.png";
import previousButton from "./assets/previousButton.png"

import useSound from "use-sound";
import { Howl } from "howler";

import switchSfx from "./assets/sfxs/play.mp3"
import stopSfx from "./assets/sfxs/stop.mp3"

import songCovers from "./assets/songpics/songCovers";
import songs from "./assets/songs/songs"

import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";

interface Song {
  songTitle: string,
  songArtist: string,
  songColor?: string,
  howl: Howl
}

interface CDProps {
  songsArePlaying: () => void;
}

export default function CD({ songsArePlaying }: CDProps) {
  const BUTTON_SOUND = 0.3;
  const MAX_VOLUME_SONG= 0.30;
  const FIRST_SONG_TITLE_WIDTH = 288;
  
  const [stopPressed, setStopPressed] = useState(true);

  const [currentSongImg, setCurrentSongImg] = useState<string>(songCovers[0]);
  const [currentSongName, setCurrentSongName] = useState<string>(`${songs[0].artist} - ${songs[0].title}`);

  const [currentSongTitleWidth, setCurrentSongTitleWidth] = useState(FIRST_SONG_TITLE_WIDTH);
  const titleVariants = {
    initial: (custom: { currentSongTitleWidth: number }) => ({
      x: custom.currentSongTitleWidth > 110 ? -(custom.currentSongTitleWidth + 60) : 0
    }),
    animate: { x: 285 },
    exit: (custom: { wasHidden: boolean; currentSongTitleWidth: number}) => {
      return custom.wasHidden ? { opacity: 0 } : { x: custom.currentSongTitleWidth > 110 ? -(custom.currentSongTitleWidth + 60) : 0 }
    }
  }

  const [startPlayingSongs, setStartPlayingSongs] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showSongTitle, setShowSongTitle] = useState(false);

  const [trackVolume, setTrackVolume] = useState(50);
  const [clickable, setClickable] = useState(false);
  
  const isFirstSong = useRef(true);
  const cdRef = useRef<HTMLImageElement>(null);
  const songIdxRef = useRef<number>(0);
  
  const howlsRef = useRef<Song[]>(undefined);
  if (!howlsRef.current) {
    howlsRef.current = songs.map((song) => ({
      songTitle: song.title,
      songArtist: song.artist,
      songColor: song.songColor,
      howl: new Howl ({src: song.songSrc, onend: () => playNextPrevSong("next"), volume: (trackVolume/100)*MAX_VOLUME_SONG})
    }))
  }
  const howls = howlsRef.current
  
  const [stop] = useSound(stopSfx, {volume: BUTTON_SOUND}); // stop soundEff
  const [prevOrNext] = useSound(switchSfx, {volume: BUTTON_SOUND}); // prev/next soundEff

  useEffect(() => {
    const timeout = setTimeout(() => {
      howls[songIdxRef.current].howl.volume((trackVolume / 100) * MAX_VOLUME_SONG);
    }, 2);

    return () => clearTimeout(timeout);
  }, [trackVolume])

  function getCurrentRotation(): number {
    if (!cdRef.current) return 0;

    const matrix = window.getComputedStyle(cdRef.current).transform;
    if (matrix == 'none') return 0;

    const [a, b] = matrix.match(/matrix\(([^)]+)\)/)![1].split(',').map(Number);
    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle;
  }

  function getTextWidth(songName: string) {
    console.log(document.fonts.check('23px "Jersey 10"'));

    const context = document.createElement("canvas").getContext("2d");
    context!.font = '23px "Jersey 10"';
    const width = context?.measureText(songName).width;
    console.log(Math.ceil(width!))
    return Math.ceil(width!);
  }

  function getSongName(song: Song) {
    return `${song.songArtist} - ${song.songTitle}`
  }

  function stopMusic() {
    if (!stopPressed) {
      const deg = getCurrentRotation();
      if (cdRef.current) cdRef.current.style.transform = `rotate(${deg}deg)`;
      howls[songIdxRef.current].howl.pause();
    } else {
      const deg = getCurrentRotation();
      const duration = 10;
      const delay = -(deg/360) * duration;

      if (cdRef.current) {
        cdRef.current.style.transform = '';
        cdRef.current.style.animationDelay = `${delay}s`;
      }
      howls[songIdxRef.current].howl.play();
    }
    setStopPressed(!stopPressed);
    stop();
  }

  function playTracks() {
    if (startPlayingSongs) return;

    setStartPlayingSongs(true);
    songsArePlaying();
    setStopPressed(false);
    howls[songIdxRef.current].howl.play();
    // getTextWidth(currentSongName)
  }

  function changeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    setTrackVolume(Number(e.target.value))
  }

  function playNextPrevSong(relativePos: string) {
    howls[songIdxRef.current].howl.stop();
    const currentSongVol = howls[songIdxRef.current].howl.volume();

    if (relativePos === "next") {
      songIdxRef.current = (songIdxRef.current + 1) % howls.length;
    } else {
      songIdxRef.current = (songIdxRef.current - 1 + howls.length) % howls.length;
    }

    setCurrentSongImg(songCovers[songIdxRef.current])

    const newSongName = getSongName(howls[songIdxRef.current]);
    const newSongTitleWidth = getTextWidth(newSongName);

    setCurrentSongTitleWidth(newSongTitleWidth);
    setCurrentSongName(newSongName);

    howls[songIdxRef.current].howl.volume(currentSongVol)
    if (stopPressed) setStopPressed(false);
    howls[songIdxRef.current].howl.play();
  }

  return (
    <>
      <motion.section
        className="cassete"
        animate={{ y: hidden ? 239 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <AnimatePresence onExitComplete={() => setClickable(true)}>
          {!startPlayingSongs && <motion.img
            draggable={false}
            src={arrowImg}
            className="arrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, delay: 3.5 }}
          />}
        </AnimatePresence>

        <AnimatePresence>
          {!startPlayingSongs && <motion.h2
            className="click-me"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, delay: 3.5 }}
          >
            Click Me!!
          </motion.h2>}
        </AnimatePresence>

        {startPlayingSongs && <motion.button
          className={clsx("stop", {pressed : stopPressed})}
          onClick={stopMusic}

          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />}

        {startPlayingSongs && <motion.input
          type="range"
          name="volume"
          value={trackVolume}
          max="100"
          min="0"

          onChange={changeVolume}

          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />}

        {startPlayingSongs && <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="previous"
          onClick={() => {prevOrNext(); playNextPrevSong("previous");}} //playPreviousSong()
        >
          <img src={previousButton} alt="Previous" />
        </motion.button>}

        {startPlayingSongs && <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="next"
          onClick={() => {prevOrNext(); playNextPrevSong("next");}} //playNextSong()
        >
          <img src={nextButton} alt="Next"/>
        </motion.button>}
        
        <motion.div className="cd">
          {startPlayingSongs && <motion.button
            initial={{ y: 280, rotate: 45 }}
            animate={{ y: -10 }}
            transition={{
              type: "spring",
              delay: 2,
              bounce: 0.3,
              duration: 3
            }}

            className={clsx(startPlayingSongs && 'hide', {hidden: hidden})}
            style={{
              background: hidden ? `${howls[songIdxRef.current].songColor}` : undefined,
              boxShadow: hidden ? `${howls[songIdxRef.current].songColor} -15px -10px 15px -4px` : undefined,
              '--song-color': howls[songIdxRef.current].songColor,
            } as React.CSSProperties}
            onClick={() => {
              setHidden(!hidden);
              if (!hidden) setShowSongTitle(false);
            }}
          >
            {startPlayingSongs ? "HIDE" : ""}
          </motion.button>}
            <motion.img
              key={currentSongImg}
              ref={cdRef}
              className={clsx(stopPressed ? "stop" : "play")}

              onClick={!startPlayingSongs ? playTracks : clickable ? () => setShowSongTitle(!showSongTitle) : undefined}

              src={cdImage}
              style={{
                cursor: clickable ? "pointer" : "disabled",
                backgroundImage: `url(${currentSongImg})`
              }}
              width='150px'
              height='150px'

              initial={isFirstSong.current ? { opacity: 0 } : false }
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 1.5 }}

              onAnimationComplete={() => {
                isFirstSong.current = false;
              }}
            />

        </motion.div>
      </motion.section>

      <AnimatePresence custom={{ wasHidden: hidden, currentSongTitleWidth }}>
        {showSongTitle && <motion.h2
          className="songInfo"
          style={{ fontFamily: '"Jersey 10"' }}
          custom={{ wasHidden: hidden, currentSongTitleWidth }}
          variants={titleVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {currentSongName}
        </motion.h2>}
      </AnimatePresence>
    </>
  )
}