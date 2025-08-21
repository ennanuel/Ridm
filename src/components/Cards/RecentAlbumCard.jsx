import { useState, useRef } from 'react'
import ColorThief from 'colorthief'
import { Link } from 'react-router-dom'

const RecentAlbumCard = ({ album, i }) => {
  const [[background, text], setColors] = useState(['', '', ''])
  const imageRef = useRef()
  
  const onLoad = () => {
    const colorThief = new ColorThief()
    const colors = colorThief.getPalette(imageRef.current).slice(0, 2)
    if (colors.length != 2) return
    setColors(() => colors.map(([r, g, b]) => `rgb(${r}, ${g}, ${b})`))
  }

  return (
    <Link to={`/albums/${album.id}`}>
      <div className="relative h-[100px] rounded-lg overflow-clip shadow-lg shadow-black bg-black/60 text-white">
        <img crossOrigin='anonymous' ref={imageRef} onLoad={onLoad} className="absolute top-0 right-0 h-full aspect-square" src={album.cover_medium} alt={album.title} />
        <div style={{ background: `linear-gradient(90deg, ${background} 50%, transparent)` }} className="w-full h-full relative z-1 flex flex-col items-start justify-center p-4">
          <p style={{color: text}} className="relative truncate $text-white font-bold text-xs">{album.title}</p>
          <p style={{color: text}} className="relative truncate opacity-75 font-bold text-[0.7em]">{album.artist.name}</p>
        </div>
      </div>
    </Link>
  )
}

export default RecentAlbumCard
