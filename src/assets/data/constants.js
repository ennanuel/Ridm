import { AiOutlineHome, AiFillHome, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsBarChartLine, BsFillBarChartLineFill } from 'react-icons/bs'
import { MdLibraryMusic, MdOutlineLibraryMusic } from 'react-icons/md';
import { RiPlayListFill, RiPlayListLine } from "react-icons/ri";

import { displayMessage } from "../../functions/prompt"
import { addBlacklist, deletePlaylists, editCurrentPlaylist, removeFromPlaylist } from "../../functions/library"


export const APIURL = 'https://ridm-proxy.onrender.com'

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
  { name: 'album', to: 'albums', image: null },
  { name: 'artist', to: 'artists', image: null },
  { name: 'song', to: 'songs', image: null },
  { name: 'radio', to: 'radios', image: null },
]

export const promptFunctions = {
  'deletePlaylist': ({dispatch, data}) => {
    deletePlaylists(dispatch, [data])
    displayMessage(dispatch, 'Playlist deleted.')
  },
  'addToBlacklist': ({dispatch, navigate, data}) => {
    addBlacklist(dispatch, data.type, data)
    displayMessage(dispatch, 'Added to Blacklist!')
    if(!navigate(-1)) {
      navigate('/')
    }
  },
  'removeSongFromPlaylist': ({dispatch, data}) => {
    removeFromPlaylist(dispatch, data)
    displayMessage(dispatch, 'Songs Removed')
  },
  'editPlaylist': ({dispatch, data, navigate}) => {
    editCurrentPlaylist(dispatch, data)
    displayMessage(dispatch, 'Playlist edited!')
    navigate(`/playlists/${data.id}`)
  }
}
