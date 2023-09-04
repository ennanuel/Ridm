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
    console.log(colors);
    if (colors.length < 3) return;
    setColors(colors.map( ([r,g,b], i) => `rgba(${r}, ${g}, ${b}, ${i === 0 ? '0.7' : '1'})`))
    console.log(colors);
  }

  return (
    <div style={{background: `linear-gradient(90deg, ${bg}, ${text2})`}} className="min-h-[30vh] mt-[-60px] pt-[80px] relative shadow-lg shadow-black/40 flex flex-col md:flex-row gap-4 items-start md:items-end justify-start p-6 overflow-x-clip">
      <div className="bg-black/40 shadow-lg shadow-black/50 h-[150px] aspect-square">
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
