import { MdPlaylistAdd } from "react-icons/md"

const Details = ({ playlistInfo, handleChange }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
      <div className="aspect-square w-[150px] bg-white/5">
        {
          playlistInfo.tracks.length > 0 &&
          <img 
            src={playlistInfo.tracks[playlistInfo.tracks.length - 1].album.cover_medium} 
            className="h-full w-full block" 
            alt="" 
          />
        }
      </div>
      <div className="flex-1 flex flex-row flex-wrap gap-4 justify-between items-end">
        <input
            type="text" 
            id="name" 
            value={playlistInfo.name} 
            onChange={handleChange} 
            className="md:max-w-[300px] bg-transparent border-b border-gray-400 opacity-80 focus:opacity-100 outline-none text-white placeholder:text-gray-400 text-lg" 
            placeholder="Title" 
        />
        <button className="flex w-fit truncate items-center justify-center gap-[3px] bg-gray-200 text-black text-sm md:text-base border border-gray-200 h-[26px] md:h-[34px] rounded-[17px] px-2 md:px-3 transition-[background-color] hover:bg-transparent hover:text-gray-200">
          <MdPlaylistAdd size={30} />
          <span className="font-semibold justify-self-end">Create Playlist</span>
        </button>
      </div>
    </div>
  )
}

export default Details
