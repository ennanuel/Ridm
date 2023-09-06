import { AiOutlineDelete } from "react-icons/ai"

const EditPlaylistDetails = ({ editData, playlist, handleChange, songsToBeDeleted, handleEdit, setParams, handleDelete }) => {
  return (
  <div className="flex-col flex-1">
    <input 
      className="px-2 py-1 rounded-md text-white text-base md:text-xl lg:text-2xl bg-white/10 focus:outline-none block w-fit placeholder:text-gray-400" 
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
        <button onClick={handleEdit} className="py-1 md:py-2 px-3 md:px-4 font-bold transition-colors bg-gray-300 border-2 border-gray-300 hover:border-gray-100 hover:bg-gray-100 text-black rounded-md">Done</button>
        <button onClick={() => setParams({})} className="py-1 md:py-2 px-3 md:px-4 font-bold transition-colors border-2 border-300 hover:border-gray-100 hover:text-gray-100 text-gray-300 rounded-md">Cancel</button>
      </div>
      {
        songsToBeDeleted.length > 0 &&
        <button onClick={handleDelete} className="flex items-center justify-center bg-black/80 text-red-500 p-1 md:p-2 rounded-md">
          <AiOutlineDelete size={30} />
        </button>
      }
    </div>
  </div>
  )
}

export default EditPlaylistDetails
