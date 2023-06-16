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
        <button className="flex w-fit truncate items-center justify-center text-gray-400 border-2 border-gray-400 rounded-md px-2 py-1 transition-[background-color] hover:bg-gray-400 hover:text-black">
          <MdPlaylistAdd size={30} />
          <span className="font-semibold">Create Playlist</span>
        </button>
      </div>
    </div>
  )
}

export default Details
