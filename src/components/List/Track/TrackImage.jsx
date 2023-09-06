import { useDispatch } from 'react-redux'

import { BiPause, BiPlay } from "react-icons/bi"
import { pause, playSongs } from '../../../functions/player'

const TrackImage = ({ active, song, isPlaying, tracks, i }) => {
    const dispatch = useDispatch()

    return (
        <td className="relative text-gray-300 px-2 font-bold text-xs">
            <span className={`track_no absolute top-0 left-0 w-full h-full flex items-center justify-center  ${active && 'opacity-0 pointer-events-none'}`}>{i+1}.</span>
            <button 
                className={`w-full flex justify-center items-center text-white ${active ? 'active-track' : 'play_pause_track'}`} 
                onClick={() => active && isPlaying ? pause(dispatch) : playSongs({dispatch, song, i, tracks})}
            >
                {
                    active && isPlaying ?
                    <BiPause size={25} /> :
                    <BiPlay size={25} />
                }
            </button>
        </td>
    )
}

export default TrackImage
