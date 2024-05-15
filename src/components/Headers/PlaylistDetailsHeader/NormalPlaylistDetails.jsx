import { BsDot } from "react-icons/bs"
import { Options } from "../../Options"
import { PlayButton, ShuffleButton } from "../../Buttons"

const NormalPlaylistDetails = ({ playlist, primary, secondary }) => {
  return (
    <div className="flex-1">
      <h2 className="text-white font-bold text-[2.3rem]">{playlist.name}</h2>
      <div className="flex flex-wrap items-center font-semibold text-xs mb-4 gap-1">
        <p className="text-gray-400 text-sm">{playlist.tracks.length} songs</p>
        <ul className="flex flex-wrap items-center text-gray-500">
          {
            playlist.genres.map((genre, i) =>
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
          <PlayButton bg={primary} text={secondary} tracks={playlist.tracks} song={playlist.tracks[0]} i={0} />
          <ShuffleButton bg={secondary} text={primary} tracks={playlist.tracks} />
        </div>
        <Options type="playlist" song={playlist.tracks[0]} tracks={playlist.tracks} i={0} playlist={playlist} />
      </div>
    </div>
  )
}

export default NormalPlaylistDetails
