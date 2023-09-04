import { playNext } from '../../functions/player'

import { MdPlaylistAdd } from 'react-icons/md'

import { useDispatch } from 'react-redux'

const PlayNextButton = ({ tracks, album }) => {
  const dispatch = useDispatch()

  const addToQueue = () => {
    playNext({dispatch, tracks, album})
  }

  return (
    <button onClick={addToQueue} className="lg:px-5 lg:h-[50px] truncate rounded-md w-fit border border-[rgba(145,216,247,0.2)] text-[#91D8F7] font-semibold gap-2 flex flex-row items-center justify-center relative bg-[#101010] px-3 h-[40px]">
        <MdPlaylistAdd size={25} />
        Play next
    </button>
  )
}

export default PlayNextButton
