import { Options } from '../..//Options'
import { FavoriteButton, PlayButton, ShuffleButton } from '../../Buttons'

import { MdClose } from 'react-icons/md'
import { useGetRadioTracksQuery } from '../../../redux/services/DeezerApi'
import { Songs } from '../../List'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getData } from '../../../utils/getData'

const RadioBox = ({ radio, show, handleClick }) => {
    const { library } = useSelector(state => state);
    const { data: radioData, isFetching, error } = useGetRadioTracksQuery(radio.id)
    const [radioTracks, setRadioTracks] = useState([])

    useEffect(() => {
        setRadioTracks(getData({ type: 'radios', data: radioData?.data }));
    }, [library, radioData]);

    return (
        <>
            <button
                className="absolute top-0 right-0 m-2 w-[40px] h-[40px] flex items-center justify-center bg-white/10 rounded-full text-gray-200 transition-[transform, opacity] opacity-90 hover:scale-110 hover:opacity-100"
                onClick={() => handleClick(false)}
            >
                <MdClose size={25} />
            </button>
            <div className="flex relative items-end justify-start gap-4 flex-wrap">
                <img src={radio.picture_medium} alt="" className="z-[0] absolute top-[-100px] left-[-100px] w-[50%] max-w-[360px] aspect-square blur-[70px] opacity-20" />
                <img className={`shadow-lg shadow-black/50 rounded-[10px] ${show && 'w-[150px] aspect-square'}`} src={radio.picture_medium} alt="" />
                <p className="relative flex flex-col">
                    <span className="text-gray-400 text-sm font-bold">{radio.type}</span>
                    <span className="text-white uppercase text-xl font-bold truncate">{radio.title}</span>
                    <span className="text-gray-200 text-sm font-semibold">{radioTracks?.length && `${radioTracks?.length} Song${radioTracks?.length === 1 ? '' : 's'}`}</span>
                </p>
                {
                    radioTracks?.length > 0 &&
                    <div className="flex-1 flex flex-row justify-start lg:justify-end items-center gap-4 lg:mt-[-20px]">
                        <PlayButton i={0} song={radioTracks[0]} tracks={radioTracks} />
                        <ShuffleButton tracks={radioTracks} />
                    </div>
                }
            </div>
            <div className="relative flex flex-row items-center gap-3 my-4">
                <FavoriteButton type="radios" data={radio} />
                <Options type="radio" song={radioTracks && radioTracks[0]} i={0} radio={radio} tracks={radioTracks} blacklist={radio.blacklist} favorite={radio.favorite} />
            </div>
            <div className="relative rounded-[20px] bg-black/50 max-h-[60vh] overflow-y-scroll overflow-x-clip px-4">
                <Songs isFetching={isFetching} error={error} songs={radioTracks} />
            </div>
        </>
    )
};

export default RadioBox;
