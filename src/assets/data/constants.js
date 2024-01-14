import { AiOutlineHome, AiFillHome, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsBarChartLine, BsFillBarChartLineFill } from 'react-icons/bs'
import { MdLibraryMusic, MdOutlineLibraryMusic } from 'react-icons/md';
import { RiPlayListFill, RiPlayListLine } from "react-icons/ri";
import { songImage, artistImage, albumImage, radioImage } from '../images';

export const links = [
  { name: 'Home', to: '/', icon: AiOutlineHome, altIcon: AiFillHome },
  { name: 'Charts', to: '/charts', icon: BsBarChartLine, altIcon: BsFillBarChartLineFill },
  { name: 'Genres', to: '/genres', icon: MdOutlineLibraryMusic, altIcon: MdLibraryMusic },
];

export const secondLinks = [
  { name: 'Playlist', to: '/playlists', icon: RiPlayListFill, altIcon: RiPlayListLine, color: 'text-purple-400', bgFrom: 'from-purple-200', bgTo: 'to-purple-500' },
  { name: 'Favorites', to: '/favorites', icon: AiFillHeart , altIcon: AiOutlineHeart, color: 'text-red-400', bgFrom: 'from-red-200', bgTo: 'to-red-500' }
]

export const categories = [
  { name: 'album', to: 'albums', desc: "View Albums Releases Toping the Charts", image: albumImage },
  { name: 'artist', to: 'artists', desc: "View Artists That are Treding Right Now", image: artistImage },
  { name: 'song', to: 'songs', desc: "View Songs That are Toping the Charts", image: songImage },
  { name: 'radio', to: 'radios', desc: "Tune in to the Top Radio Selections", image: radioImage },
]
