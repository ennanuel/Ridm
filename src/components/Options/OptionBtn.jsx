import React from 'react';
import { BiDotsVerticalRounded, BiMenuAltLeft } from 'react-icons/bi';

const OptionBtn = ({ open, optionType, btnRef, small }) => {
    return (
        <button
            onClick={open}
            ref={btnRef}
            className={`text-white aspect-square rounded-full ${!small && 'w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full bg-white/5 hover:bg-white/10'} flex items-center justify-center drop-shadow-lg peer`}
        >
            {
                optionType == 'playlists' ?
                    <BiMenuAltLeft size={small ? 18 : 25} /> :
                    <BiDotsVerticalRounded size={small ? 18 : 25} />
            }
        </button>
    )
};

export default OptionBtn
