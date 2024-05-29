import { AiOutlineDelete } from "react-icons/ai"

const EditPlaylistDetails = ({ editData, playlist, handleChange, songsToBeDeleted, handleEdit, setParams, handleDelete }) => {
  return (
  <div className="relative z-[1] flex-col flex-1">
    <input 
      className="px-2 h-[40px] md:h-[50px] rounded-[25px] text-white text-base bg-white/10 focus:outline-none block w-fit placeholder:text-gray-400" 
      value={editData.name} 
      placeholder={playlist.name} 
      onChange={handleChange} 
      type="text" 
    />
    <p className="text-gray-400 text-base my-2">
      {songsToBeDeleted.length} song{songsToBeDeleted.length > 1 ? 's' : ''} selected
    </p>

    <div className="flex flex-row gap-4 flex-wrap justify-between items-center">
      <div className="flex items-center gap-2">
        <button onClick={handleEdit} className="px-3 md:px-4 h-[36px] md:h-[46px] rounded-[25px] font-bold transition-colors bg-gray-300 hover:bg-white border border-gray-300 hover:border-gray-100 text-black">Done</button>
        <button onClick={() => setParams({})} className="px-3 md:px-4 h-[36px] md:h-[46px] rounded-[25px] font-bold transition-colors bg-white/5 hover:bg-white/10 border border-300 hover:border-gray-100 hover:text-white text-gray-300">Cancel</button>
      </div>
      {
        songsToBeDeleted.length > 0 &&
        <button onClick={handleDelete} className="flex items-center justify-center bg-black/80 text-red-500 h-[40px] w-[40px] rounded-[10px]">
          <AiOutlineDelete size={25} />
        </button>
      }
    </div>
  </div>
  )
}

export default EditPlaylistDetails
