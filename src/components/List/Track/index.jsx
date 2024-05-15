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
            <input type="checkbox" className="w-[15px] h-[15px]" checked={songsToBeDeleted.includes(song.id)} /> :                        
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
