import { BsVolumeOffFill, BsVolumeDownFill } from "react-icons/bs"

const Volume = ({ volume, setVolume }) => {
  return (
    <div className="flex gap-2 items-center justify-center text-gray-400 mt-4 w-[60%]">
        <BsVolumeOffFill size={20} />
        <input value={volume} min="0" max="1" onInput={e => setVolume(e.target.value)} type="range" step="any" className="volume_slider w-[90%]" />
        <BsVolumeDownFill size={20} />
    </div>
  )
}

export default Volume
