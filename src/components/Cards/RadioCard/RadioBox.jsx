import { Loader, Error, SongLoading } from '../../LoadersAndError'
import { SongBar } from '../'
import { Options } from '../..//Options'
import { FavoriteButton, PlayButton, ShuffleButton } from '../../Buttons'

import { MdArrowBack } from 'react-icons/md'
import { useGetRadioTracksQuery } from '../../../redux/services/DeezerApi'
import { Songs } from '../../List'

const RadioBox = ({ radio, show, handleClick }) => {
    const {data: radioData, isFetching, error} = useGetRadioTracksQuery(radio.id)
    const radioTracks = radioData?.data

  return (
    <>
        <button 
        className="absolute top-0 right-0 m-2 w-[30px] h-[30px] flex items-center justify-center bg-white/10 rounded-md text-gray-200 transition-[transform, opacity] opacity-90 hover:scale-110 hover:opacity-100" 
        onClick={() => handleClick(false)}
        >
            <MdArrowBack size={25} />
        </button>
        <div className="flex flex-row items-end justify-start gap-4 flex-wrap">
            <img className={`shadow-lg shadow-black/50 ${show && 'w-[150px]'}`} src={radio.picture_medium} alt="" />
            <p className="flex flex-col">
                <span className="text-gray-400 text-sm font-bold">{radio.type}</span>
                <span className="text-white uppercase text-xl font-bold truncate">{radio.title}</span>
                <span className="text-gray-200 text-sm font-semibold">{radioTracks?.length} Songs</span>
            </p>
        <div className="flex-1 flex flex-row justify-start lg:justify-end items-center gap-4 lg:mt-[-20px]">
            <PlayButton />
            <ShuffleButton />
        </div>
        </div>
        <div className="flex flex-row items-center gap-4 my-4">
            <FavoriteButton />
            <Options type="radio" />
        </div>
        <div className="rounded-md bg-black/50 max-h-[50vh] overflow-y-scroll overflow-x-clip">
            <Songs isFetching={isFetching} error={error} songs={radioTracks} />
        </div>
    </>
    )
}

export default RadioBox
