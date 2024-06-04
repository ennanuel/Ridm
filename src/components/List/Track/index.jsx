import { Options } from '../../Options'
import TrackImage from './TrackImage'
import TrackInfo from './TrackInfo'


const Track = ({ i, tracks, song, activeSong, handleTrack, songsToBeDeleted, isPlaying, edit, playlists, playlist }) => {
  const handleClick = () => edit && handleTrack(song.id)
  const active = song?.id === activeSong?.id

  return (
    <tbody
      tabIndex={2} 
      className={`album-track h-[40px] md:h-[50px] focus:bg-white/10 ${active && 'bg-white/5'} hover:bg-white/5 hover:border-transparent h-[42px] border-t border-white/5 last:rounded-b-[20px]`}
    >
      <tr 
        onClick={handleClick}
      >
        <TrackImage 
          active={active}
          song={song} 
          isPlaying={isPlaying} 
          tracks={tracks} i={i}
          />
        <TrackInfo song={song} />
        <td className="text-gray-200 px-2">
          {
            edit ?
              <span className="flex relative items-center justify-center">
                <input type="checkbox" className="peer opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer" checked={songsToBeDeleted.includes(song.id)} />
                <span className="block w-[15px] h-[15px] border-[5px] border-gray-200/50 aspect-square rounded-full peer-hover:border-gray-200 peer-checked:bg-gray-200 peer-checked:border-transparent"></span>
              </span>:                        
            <Options 
              playlists={playlists}
              type="track" 
              small={true} 
              song={song} 
              playlist={playlist} 
              tracks={tracks} 
              favorite={song.favorite}
              i={i} 
            />
        }
        </td>
      </tr>
    </tbody>
  )
}

export default Track
