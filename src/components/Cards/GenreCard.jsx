import { Link } from "react-router-dom";
import ColorThief from "colorthief";
import { useRef, useState } from "react";

const GenreCard = ({ genre, i }) => {
  const imageRef = useRef(null);
  const [backgroundColor, setBackgroundColor] = useState('');

  function onLoad() {
    const colorThief = new ColorThief();
    const color = colorThief.getPalette(imageRef.current)[0];
    if (!color?.length) return;
    const [r, g, b] = color;
    setBackgroundColor(`rgba(${r}, ${g}, ${b})`);
  }
    
  return (
    <Link
      to={'/genres/' + genre.id}
      style={{ '--delay': i / 10 + 's', backgroundColor }}
      className="genre-card group relative p-2 bg-white/5 w-full aspect-[2] flex flex-col gap-2 transition-[background-color,transform] rounded-lg overflow-clip"
    >
      <div className="relative z-[1] flex flex-col items-start justify-start transition-colors">
        <p className="text-white/50 font-bold text-xs text-right drop-shadow drop-shadow-black/50">editorial</p>
        <p className="text-white font-semibold text-base uppercase text-left lg:text-right drop-shadow drop-shadow-black/50">{genre.name}</p>
      </div>
      <div className="relative flex-1">
        <img crossOrigin="anonymous" ref={imageRef} onLoad={onLoad}  src={genre.picture_medium} alt={genre.name} className="rounded-xl absolute h-[120%] min-h-[60px] aspect-square bottom-[-10px] right-[-10%] rotate-[20deg] shadow-2xl shadow-black/50 bg-black/50 transition-transform group-hover:rotate-[15deg] group-hover:scale-[1.05]" />
      </div>
    </Link>
  )
}

export default GenreCard
