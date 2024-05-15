import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { editPlaylist } from '../../redux/features/librarySlice'
import { hidePlaylistPrompt, hideSuccessMessage, showSuccessMessage } from '../../redux/features/promptSlice'
import { MdAdd } from 'react-icons/md'

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
      <div className={`w-full flex flex-col gap-4 max-w-[260px] overflow-hidden bg-black/90 border border-white/5 p-4 rounded-[20px] transition-transform ${!displayPlaylistPrompt && 'scale-50'}`}>
        <p className="font-semibold text-center text-gray-200 text-base">Add to playlist</p>
        <ul className="mt-4 flex flex-col gap-2 text-sm text-gray-400">
          {
            playlists?.length < 1 ?
              <li onClick={() => { navigate('/playlists?add=true'); closePrompt() }} className="flex rounded-[10px] border border-white/5 items-center gap-2 justify-start h-[40px] px-4 font-bold hover:text-gray-200 hover:border-transparent hover:bg-white/5">
                <MdAdd size={25} />
                <span>New playlist</span>
              </li> :
              playlists.map((playlist, i) =>
                <li key={playlist.id} onClick={() => saveToPlaylist(playlist)} className="flex items-center justify-start rounded-[10px] border border-white/5 h-[40px] px-4 border-b hover:text-gray-200 hover:border-transparent hover:bg-white/5">{playlist.name}</li>
              )
          }
        </ul>
        <button onClick={closePrompt} className="w-full h-[40px] rounded-[10px] flex items-center justify-center bg-red-800 hover:bg-red-600 text-sm text-gray-200 font-semibold">Cancel</button>
      </div>
    </section>
  )
}

export default AddToPlaylist