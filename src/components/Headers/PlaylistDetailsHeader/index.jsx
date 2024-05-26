import { useState, useRef } from 'react';
import ColorThief from 'colorthief';
import EditPlaylistDetails from './EditPlaylistDetails'
import NormalPlaylistDetails from './NormalPlaylistDetails'

const PlaylistDetailsHeader = ({ playlist, songsToBeDeleted, editData, handleEdit, handleDelete, setParams, params, handleChange }) => {
  const [[bg, text1, text2], setColors] = useState(['', '', ''])
  const imgRef = useRef();

  const handleLoad = () => {
    const colorThief = new ColorThief();
    const colors = colorThief.getPalette(imgRef.current).slice(0, 3);
    if (colors.length < 3) return;
    setColors(colors.map( ([r,g,b], i) => `rgba(${r}, ${g}, ${b}, ${i === 0 ? '0.7' : '1'})`))
  }

  return (
    <div className="relative shadow-lg shadow-black/40 flex flex-col md:flex-row gap-6 items-start md:items-end justify-start p-2 md:p-4 mx-4 rounded-[15px] border border-white/5 overflow-x-clip">
      <div className="absolute w-full h-full z-0 overflow-hidden rounded-[15px] bottom-0 left-0">
        {
          playlist.tracks.length > 0 &&
          <img
            crossOrigin="anonymous"
            src={playlist.tracks[0].album.cover_medium}
            alt={playlist.name}
            className="h-[100%] max-h-[360px] opacity-50 blur-[50px] object-cover"
          />
        }
      </div>
      <div className="relative bg-black/40 shadow-lg shadow-black/50 h-[150px] aspect-square">
        {playlist.tracks.length > 0 &&
          <img
            crossOrigin="anonymous"
            onLoad={handleLoad}
            ref={imgRef}
            src={playlist.tracks[0].album.cover_medium}
            alt={playlist.name}
            className="w-full h-full rounded-md"
          />}
      </div>
      {
        params.get('edit') === 'true' ?
        <EditPlaylistDetails  
          editData={editData} 
          playlist={playlist} 
          handleChange={handleChange} 
          songsToBeDeleted={songsToBeDeleted} 
          handleEdit={handleEdit} 
          setParams={setParams} 
          handleDelete={handleDelete}
        /> :
          <NormalPlaylistDetails primary={text1} secondary={text2} playlist={playlist} />
      }
    </div>
  )
}

export default PlaylistDetailsHeader
