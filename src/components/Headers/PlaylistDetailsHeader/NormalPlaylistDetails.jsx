import { BsDot } from "react-icons/bs"
import { Options } from "../../Options"
import { PlayButton, ShuffleButton } from "../../Buttons"

const NormalPlaylistDetails = ({ playlist, primary, secondary }) => {
  return (
    <div className="flex-col flex-1">        
      <h2 style={{color: primary}} className="text-white font-bold text-2xl">{playlist.name}</h2>
      <div className="flex flex-wrap items-center font-semibold text-xs mb-2 gap-1">
        <p style={{ color: primary }} className="text-gray-400 text-sm">{playlist.tracks.length} songs</p>
        <ul style={{ color: primary }} className="flex flex-wrap items-center text-gray-500">
          {
            playlist.genres.map( (genre, i) =>
              <>
              <BsDot size={16} />
              <li key={i}>{genre.name}</li>
              </>
            )
          }
        </ul>
      </div>
      <div className="flex flex-row gap-4 flex-wrap justify-between items-center">
        <div className="flex-1 flex flex-row gap-4">
          <PlayButton tracks={playlist.tracks} song={playlist.tracks[0]} i={0} />
          <ShuffleButton tracks={playlist.tracks} />
        </div>
          <Options type="playlist" song={playlist.tracks[0]} tracks={playlist.tracks} i={0} playlist={playlist} />
      </div>
      </div>
  )
}

export default NormalPlaylistDetails
