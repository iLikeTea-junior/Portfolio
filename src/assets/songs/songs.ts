import ESCAPE from "./JET SKI WAIST HIGH - ESCAPE.mp3";
import PauloSunset from "./São Paulo Sunset.mp3";
import PrismCorp from "./PrismCorp Virtual Enterprises - Pure.mp3";
import MemoryBliss from "./Set Adrift On Memory Bliss.mp3";
import HoeCakes from "./Hoe Cakes.mp3";
import Porcelain from "./Porcelain.mp3";
import DownUnder from "./Men At Work - Down Under (Official HD Video).mp3";
import MomentaryBliss from "./Momentary Bliss (feat. slowthai and Slaves).mp3";
import LOFY from "./Looking Out for You.mp3";
import VoyageVoyage from "./Voyage, Voyage.mp3";
import FinalDays from "./Final Days.mp3";
import Cariño from "./Cariño.mp3"
import Sunshine from "./Sunshine.mp3";
import cAPTCHA from "./cAPTCHA.mp3";
import SayYoullBeThere from "./Say You'll Be There.mp3";
import CloseToMe from "./Close To Me (Closest Mix).mp3";
import Macintosh420 from "./Macintosh Plus - リサフランク420  現代のコンピュー - Mr. Introvert Remix.mp3";
import Buttercup from "./Buttercup.mp3";
import ILoveYouSo from "./I Love You So.mp3";

export interface Song {
    title: string,
    artist: string,
    songSrc: string,
    songColor: string
}

export function getSongName(song: Song) {
    return `${song.artist} - ${song.title}`
}

const songs = [
    {title: "Pure", artist: "PrismCorp Virtual Enterprise", songSrc: PrismCorp, songColor: "rgb(1, 88, 255)"},
    {title: "Porcelain", artist: "Moby", songSrc: Porcelain, songColor: "rgb(84, 154, 156)"},
    {title: "420 (Mr. Introvert Remix)", artist: "Macintosh Plus", songSrc: Macintosh420, songColor: "rgb(255, 129, 156)"},
    {title: "Cariño", artist: "The Marías", songSrc: Cariño, songColor: "rgb(201, 68, 79)"},
    {title: "Say You'll Be There", artist: "Spice Girls", songSrc: SayYoullBeThere, songColor: "rgb(255, 255, 255)"},
    {title: "Voyage, Voyage", artist: "DESIRELESS", songSrc: VoyageVoyage, songColor: "rgb(147, 69, 147)"},
    {title: "Buttercup", artist: "Jack Stauber", songSrc: Buttercup, songColor: "rgb(54, 117, 98)"},
    {title: "I Love You So", artist: "Junko Ohashi", songSrc: ILoveYouSo, songColor: "rgb(28, 142, 205)"},
    {title: "São Paulo Sunset", artist: "saib.", songSrc: PauloSunset, songColor: "rgb(206, 206, 158)"},
    {title: "Sunshine", artist: "Steve Lacy", songSrc: Sunshine, songColor: "rgb(226, 69, 50)"},
    {title: "Close To Me", artist: "The Cure", songSrc: CloseToMe, songColor: "rgb(222, 56, 20)"},
    {title: "Down Under", artist: "Men At Work", songSrc: DownUnder, songColor: "rgb(255, 236, 1)"},
    {title: "cAPTCHA", artist: "World Brain", songSrc: cAPTCHA, songColor: "rgb(128, 160, 93)"},
    {title: "Set Adrift On Memory Bliss", artist: "P.M. Dawn", songSrc: MemoryBliss, songColor: "rgb(158, 166, 215)"},
    {title: "Final Days", artist: "Michael Kiwanuka", songSrc: FinalDays, songColor: "rgb(163, 131, 18)"},
    {title: "ESCAPE", artist: "JET SKI WAIST HIGH", songSrc: ESCAPE, songColor: "rgb(252, 152, 236)"},
    {title: "Looking Out for You", artist: "Joy Again", songSrc: LOFY, songColor: "rgb(242, 214, 229)"},
    {title: "Hoe Cakes", artist: "MF DOOM", songSrc: HoeCakes, songColor: "rgb(166, 185, 95)"},
]

export default songs;