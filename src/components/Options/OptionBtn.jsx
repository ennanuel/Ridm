import React from 'react';
import { BiDotsVerticalRounded, BiMenuAltLeft } from 'react-icons/bi';

const OptionBtn = ({ openModal, optionType, btnRef, small }) => {
    return (
        optionType === 'playlists' ?
            <button
                onClick={openModal}
                ref={btnRef}
                className={`peer text-white aspect-square rounded-full w-10 md:w-12 focus:bg-white/10 flex items-center justify-center drop-shadow-lg`}
            >
                <BiMenuAltLeft size={24} />
            </button> :
            <button
                onClick={openModal}
                ref={btnRef}
                className={`${!small && 'w-10 h-10 md:w-[50px] md:h-[50px] rounded-full hover:bg-white/10 bg-white/5'} peer text-white aspect-square rounded-full focus:bg-white/10 flex items-center justify-center drop-shadow-lg`}
            >
                <BiDotsVerticalRounded size={small ? 18 : 24} />
            </button>
    )
};

export default OptionBtn
