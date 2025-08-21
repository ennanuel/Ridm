
import { useMemo } from 'react';
import { playSongs } from '../../utils/player';
import { FiPlay } from 'react-icons/fi';

const INDECES_WITH_BIG_SQUARES = [1, 5];

const SuggestedCard = ({ song, index, tracks }) => {
    const cardIsBig = useMemo(() => INDECES_WITH_BIG_SQUARES.includes(index), [index]);

    return (
        <button 
            onClick={() => playSongs({ tracks, index, song })}
            style={{
                background: `center / cover url(${cardIsBig ? song?.album?.cover_xl : song?.album?.cover_medium})`,
                '--delay': index / 10 + 's'
            }} 
            className={`${cardIsBig ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1 aspect-square'} group relative rounded-xl overflow-hidden transition-transform active:scale-90 duration-300`}
        >
            <div className="relative w-full h-full group-hover:opacity-100 opacity-0 bg-black/50 flex items-center justify-center">
                <span className="flex items-center justify-center w-12 aspect-square rounded-full bg-zinc-900/50 text-white backdrop-blur-md">
                    <FiPlay size={20} />
                </span>
            </div>
        </button>
    )
}

export default SuggestedCard
