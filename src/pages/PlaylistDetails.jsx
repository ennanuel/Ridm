import { useEffect, useState } from "react"

import { useNavigate, useParams, useSearchParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"

import { PlaylistDetailsHeader } from "../components/Headers"
import { Playlists, Tracks } from "../components/List"

import { playSongs, pause } from "../functions/player"
import { editPlaylistPrompt } from "../functions/prompt"

const PlaylistDetails = () => {
  const dispatch = useDispatch()

  const { id: playlistid } = useParams()

  const { playlists, favorites: {tracks, ...others} } = useSelector( state => state.library )
  const { activeSong, isPlaying} = useSelector( state => state.player )

  const [playlist, setPlaylist] = useState(() => playlists[playlists.findIndex( playlist => playlistid == playlist.id )])
  const [songsToBeDeleted, setSongsToBeDeleted] = useState([])
  const [editData, setEditData] = useState({...playlist, name: ''})
  
  const [params, setParams] = useSearchParams()

  const navigate = useNavigate()

  
  const handlePause = () => {
    pause(dispatch)
  }

  const handlePlay = (song, i, tracks) => {
    playSongs({dispatch, tracks, song, i})
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
    editPlaylistPrompt(dispatch, playlist, editData)
  }

  useEffect( () => {
    setPlaylist(() => playlists[playlists.findIndex( playlist => playlistid == playlist.id )])
  }, [playlists])

  useEffect( () => {
    if(!playlist || playlists.length < 1) {
      navigate('/playlists')
    };
  }, [playlistid, playlist])

  if(!playlist || playlists.length < 1) {
    return null;
  };

  return (
    <div>
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
        handlePause={handlePause} 
        songsToBeDeleted={songsToBeDeleted} 
        handleTrack={handleTrack} 
        editDataTracks={editData.tracks} 
        playlist={playlist} 
        playlists={playlists}
        favSongs={tracks}
        params={params}
      />
    {
      playlists.filter( playlist => playlist.id !== playlistid ).length > 0 &&
      <>
        <Playlists playlists={playlists} playlistid={playlistid}>More Playlists</Playlists>
      </>
    }
    </div>
  )
}

export default PlaylistDetails
