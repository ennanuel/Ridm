import { Options } from '../../Options'
import TrackImage from './TrackImage'
import TrackInfo from './TrackInfo'


const Track = ({ i, tracks, song, activeSong, handleTrack, songsToBeDeleted, isPlaying, edit, playlists, playlist }) => {
  const handleClick = () => edit && handleTrack(song.id)
  const active = song?.id === activeSong?.id


  return (
    <tbody key={i}>
      <tr 
        tabIndex={2} 
        className={`album-track focus:bg-white/20 ${i%2 === 1 && !active ? 'bg-white/5 hover:bg-white/10' : active ? 'bg-white/20 hover:bg-white/20' : 'bg-black/20 hover:bg-white/10'} h-[42px]`}
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
              i={i} 
            />
        }
        </td>
      </tr>
    </tbody>
  )
}

export default Track
