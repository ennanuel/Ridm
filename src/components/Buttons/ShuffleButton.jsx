import { useDispatch } from 'react-redux'

import { MdShuffle } from 'react-icons/md'

import { onShuffle, playSongs } from '../../functions/player'

const ShuffleButton = ({ album, tracks }) => {
    const dispatch = useDispatch()

    const handleShuffle = () => {
      const i = Math.floor(Math.random() * tracks.length)
      const song = tracks[i]

      playSongs({dispatch, tracks, song, i, album})
      onShuffle(dispatch)
    }

    return (
        <button onClick={handleShuffle} className="h-[40px] md:h-[50px] rounded-md px-4 border-2 border-[#91D8F7] bg-[#0000003a] truncate text-[#91D8F7] font-semibold relative flex flex-row justify-center items-center gap-2 opacity-90 transition-[transform] active:scale-90 hover:opacity-100">
        <span><MdShuffle size={25} /></span><span>Shuffle</span>
        </button>
    )
}

export default ShuffleButton
