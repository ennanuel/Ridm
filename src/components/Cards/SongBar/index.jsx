import { useSelector } from 'react-redux'
import { Options } from '../../Options'
import { pause, playSongs } from '../../../utils/player'

import SongImage from './SongImage'
import SongInfo from './SongInfo'

const SongBar = ({ tracks, song, i, artistId }) => {
  const { activeSong, isPlaying } = useSelector((store) => store.player)

  const handlePlayClick = () => {
    playSongs({ song, tracks, i })
  }

  return (
    <div
      style={{ '--delay': i / 20 + 's' }}
      className={`song-bar animate-slowfade ${song.id === activeSong?.id && 'active-song'} flex flex-row items-center hover:bg-white/5 transition-colors p-[5px] pr-5 rounded-[3px] cursor-pointer`}>
      <div className="flex-1 flex flex-row items-center ml-[-6px] overflow-hidden">
        <SongImage
          song={song}
          activeSong={activeSong}
          isPlaying={isPlaying}
          handlePlayClick={handlePlayClick}
          handlePauseClick={pause}
          tracks={tracks}
        />
        <SongInfo artistId={artistId} song={song} />
      </div>

      <Options
        type="track"
        favorite={song.favorite}
        blacklist={song.blacklist}
        small={true} song={song}
        album={song.album}
        artist={song.artist}
        tracks={tracks} i={i}
      />
    </div>
  );
};

export default SongBar;