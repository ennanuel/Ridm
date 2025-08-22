import { AiOutlineHome, AiFillHome, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsBarChartLine, BsFillBarChartLineFill } from 'react-icons/bs'
import { MdLibraryMusic, MdOutlineLibraryMusic } from 'react-icons/md';
import { RiPlayListFill, RiPlayListLine } from "react-icons/ri";

import { Albums, Artists, Songs } from '../../components/List';

export const links = [
  { name: 'Home', to: '/', icon: AiOutlineHome, altIcon: AiFillHome },
  { name: 'Charts', to: '/charts', icon: BsBarChartLine, altIcon: BsFillBarChartLineFill },
  { name: 'Genres', to: '/genres', icon: MdOutlineLibraryMusic, altIcon: MdLibraryMusic },
];

export const secondLinks = [
  { name: 'Playlist', to: '/playlists', icon: RiPlayListFill, altIcon: RiPlayListLine, color: 'text-purple-400', bgFrom: 'from-purple-200', bgTo: 'to-purple-500' },
  { name: 'Favorites', to: '/favorites', icon: AiFillHeart , altIcon: AiOutlineHeart, color: 'text-red-400', bgFrom: 'from-red-200', bgTo: 'to-red-500' }
];

export const categories = [
  { name: 'album', to: 'albums', desc: "View albums releases toping the charts" },
  { name: 'artist', to: 'artists', desc: "View artists that are trending right now" },
  { name: 'song', to: 'songs', desc: "View songs that are toping the charts" },
  { name: 'radio', to: 'radios', desc: "Tune in to the top radio selections" },
];

export const CATEGORIES = [
    {
        title: 'All',
        value: "",
    },
    {
        title: 'Song',
        value: "songs",
        Element: Songs,
    },
    {
        title: 'Artist',
        value: "artists",
        Element: Artists,
    },
    {
        title: 'Album',
        value: "albums",
        Element: Albums
    }
];