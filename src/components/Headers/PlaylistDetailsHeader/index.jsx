import EditPlaylistDetails from './EditPlaylistDetails'
import NormalPlaylistDetails from './NormalPlaylistDetails'

const PlaylistDetailsHeader = ({playlist, songsToBeDeleted, editData, handleEdit, handleDelete, setParams, params, handleChange}) => {
  return (
    <div style={{background: "var(--color)"}} className="min-h-[30vh] pt-[80px] relative shadow-lg shadow-black/40 flex flex-col md:flex-row gap-4 items-start md:items-end justify-start p-6 overflow-x-clip">
      <div className="bg-black/40 shadow-lg shadow-black/50 h-[150px] aspect-square">
        {playlist.tracks.length > 0 && <img src={playlist.tracks[0].album.cover_medium} alt="" className="w-full h-full" />}
      </div>
      {
        params.get('edit') === 'true' ?
        <EditPlaylistDetails  
          editData={editData} 
          playlist={playlist} 
          handleChange={handleChange} 
          songsToBeDeleted={songsToBeDeleted} 
          handleEdit={handleEdit} 
          setParams={setParams} 
          handleDelete={handleDelete}
        /> :
        <NormalPlaylistDetails playlist={playlist} />
      }
    </div>
  )
}

export default PlaylistDetailsHeader
