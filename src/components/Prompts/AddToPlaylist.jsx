import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { editPlaylist } from '../../redux/features/librarySlice'
import { hidePlaylistPrompt, hideSuccessMessage, showSuccessMessage } from '../../redux/features/promptSlice'

const AddToPlaylist = () => {
  const { displayPlaylistPrompt, songsToAdd } = useSelector( state => state.prompt )
  const { playlists } = useSelector( state => state.library )
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const closePrompt = () => {
    dispatch(hidePlaylistPrompt())
  }

  const saveToPlaylist = (playlist) => {
    dispatch(editPlaylist({...playlist, tracks: [...playlist.tracks, ...songsToAdd]}))
    closePrompt()
    dispatch(hideSuccessMessage())
    dispatch(showSuccessMessage(`Song${songsToAdd.length > 1 ? 's' : ''} added to playlist`))
    setTimeout(() => {dispatch(hideSuccessMessage())}, 1100)
  }

  return (
    <section className={`fixed z-[100] top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-opacity ${!displayPlaylistPrompt && 'pointer-events-none opacity-0'}`}>
      <div className={`w-full max-w-[250px] overflow-hidden bg-black/90 border border-white/10 rounded-lg transition-transform ${!displayPlaylistPrompt && 'scale-50'}`}>
        <p className="p-3 font-semibold text-center text-gray-200 text-md">Add to playlist</p>
          <ul className="flex flex-col border-t border-white/10 text-sm text-gray-400">
            <li onClick={() => {navigate('/playlists?add=true'); closePrompt()}} className="flex items-center justify-start py-2 px-4 border-b font-bold hover:bg-white/5 hover:text-gray-200 border-white/5">Create new playlist</li>
              {
                  playlists.map( (playlist, i) => 
                    <li key={playlist.id} onClick={() => saveToPlaylist(playlist)} className="flex items-center justify-start py-2 px-4 border-b hover:bg-white/5 hover:text-gray-200 border-white/5">{playlist.name}</li>
                  )
              }
          </ul>
        <button onClick={closePrompt} className="w-full py-2 border-t-2 border-white/10 bg-red-800 hover:bg-red-600 text-sm text-gray-200 font-semibold">Cancel</button>
      </div>
    </section>
  )
}

export default AddToPlaylist