import React from 'react';
import { BiMenu } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';

const OptionBtn = ({ open, optionType, btnRef, iconSize }) => {
    return (
        <button
            onClick={open}
            ref={btnRef}
            className={`text-white flex items-center justify-center drop-shadow-lg`}
        >
            {
                optionType == 'playlists' ?
                    <BiMenu size={iconSize} /> :
                    <BsThreeDots size={iconSize} />
            }
        </button>
    )
};

export default OptionBtn
