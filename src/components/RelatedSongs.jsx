import SongBar from "./SongBar";

const RelatedSongs = ({ songData, songs, isPlaying, activeSong, handlePlayClick, handlePauseClick, artistId, artist }) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">{!artistId? `More songs by ${songData?.artist.name}` : `Songs by ${artist?.name}`}</h1>

    <div className="mt-6 w-full flex flex-col">
      {
        songs?.data?.map( (song, i) =>
          <SongBar 
            key={`${song.id}-${artistId}`} 
            song={song} i={i} 
            artistId={artistId} 
            isPlaying={isPlaying} 
            activeSong={activeSong} 
            handlePauseClick={handlePauseClick} 
            handlePlayClick={handlePlayClick} 
            tracks={songs}
          />
        )
      }
    </div>
  </div>
);

export default RelatedSongs;
