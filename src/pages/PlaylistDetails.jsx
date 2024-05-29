import { useEffect, useMemo, useState } from "react"

import { useNavigate, useParams, useSearchParams } from "react-router-dom"

import { useSelector } from "react-redux";

import { PlaylistDetailsHeader } from "../components/Headers";
import { Playlists, Tracks } from "../components/List";

import { playSongs, pause } from "../utils/player";
import { editPlaylistPrompt } from "../utils/prompt";

const PlaylistDetails = () => {
  const { id: playlistid } = useParams();

  const { playlists, favorites, blacklist } = useSelector(state => state.library);
  const { activeSong, isPlaying } = useSelector(state => state.player);

  const [playlist, ...otherPlaylists] = useMemo(() => playlists.sort(playlist => playlist.id == playlistid ? -1 : 1), [playlists, playlistid]);
  const [songsToBeDeleted, setSongsToBeDeleted] = useState([]);
  const [editData, setEditData] = useState({ ...playlist, name: '' });
  
  const [params, setParams] = useSearchParams();

  const navigate = useNavigate();

  const handlePlay = (song, i, tracks) => {
    playSongs({ tracks, song, i });
  }

  const handleChange = (e) => {
    setEditData( prev => ({...prev, name: e.target.value}) )
  }

  const handleTrack = (id) => {
    setSongsToBeDeleted( prev => prev.includes(id) ? prev.filter(trackid => trackid !== id) : [...prev, id])
  }

  const handleDelete = () => {
    setEditData( prev => ({...prev, tracks: prev.tracks.filter( track => !songsToBeDeleted.includes(track.id) )}) )
    setSongsToBeDeleted([])
  }

  const handleEdit = () => {
    editPlaylistPrompt(playlist, editData);
  }

  useEffect( () => {
    if(!playlist || playlists.length < 1) {
      navigate('/playlists')
    } else {
      const text = `Playlists - ${playlist.name}`
      document.getElementById('site_title').innerText = text
    }
  }, [playlistid, playlist])

  if(!playlist || playlists.length < 1) {
    return null;
  };

  return (
    <div className="min-h-[90vh]">
      <PlaylistDetailsHeader 
        playlist={playlist} 
        songsToBeDeleted={songsToBeDeleted} 
        editData={editData} 
        handleEdit={handleEdit} 
        handleChange={handleChange}
        handleDelete={handleDelete} 
        setParams={setParams} 
        params={params} 
      />
      
      <Tracks 
        small={true} 
        tracks={playlist.tracks} 
        activeSong={activeSong} 
        isPlaying={isPlaying}
        handlePlay={handlePlay} 
        handlePause={pause} 
        songsToBeDeleted={songsToBeDeleted} 
        handleTrack={handleTrack} 
        editDataTracks={editData.tracks} 
        playlist={playlist} 
        playlists={playlists}
        params={params}
        favorites={favorites}
        blacklist={blacklist}
      />
    {
      otherPlaylists.length > 0 &&
      <div className="p-2 md:p-4">
        <h3 className="text-white font-bold text-xl py-4">More Playlist</h3>
        <Playlists playlists={otherPlaylists} playlistid={playlistid} />
      </div>
    }
    </div>
  )
}

export default PlaylistDetails
