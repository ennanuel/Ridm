import { MdPlaylistAdd } from "react-icons/md"

const Details = ({ playlistInfo, handleChange, errorSavingPlaylist }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
      <div className="aspect-square rounded-[10px] w-[150px] bg-white/5">
        {
          playlistInfo.tracks.length > 0 &&
          <img 
            src={playlistInfo.tracks[playlistInfo.tracks.length - 1].album.cover_medium} 
            className="h-full w-full block rounded-[10px]" 
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
          className={`md:max-w-[400px] w-full ${ errorSavingPlaylist ? 'bg-red-600/10 border-red-600/50 placeholder:text-red-300' : 'bg-white/5 focus:bg-transparent border-transparent focus:border-white/20 text-white placeholder:text-gray-400'} border h-[40px] md:h-[50px] rounded-[20px] px-4  outline-none transition-colors`}
            placeholder="Playlist title" 
        />
        <button className="flex w-fit truncate items-center justify-center gap-[3px] bg-gray-200 text-black text-xs md:text-sm border border-white/5 h-[30px] md:h-[40px] rounded-[20px] px-2 md:px-3 transition-[background-color] hover:bg-white/5 hover:text-gray-200">
          <MdPlaylistAdd size={25} />
          <span>Create Playlist</span>
        </button>
      </div>
    </div>
  )
}

export default Details
