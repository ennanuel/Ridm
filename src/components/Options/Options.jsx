import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { options } from "../../utils/options";

import { filterOptions } from "../../utils/option";

import Option from './Option';
import OptionBtn from "./OptionBtn";

const Options = ({type, small, song, artist, genre, album, radio, playlist, tracks, i, favorite, blacklist }) => {
    const filteredOptions = useMemo(() => filterOptions({ options, type, favorite, blacklist }), [blacklist, favorite, playlist]);
    const iconSize = useMemo(() => window.innerWidth < 1024 ? 18 : small ? 20 : 30, []);
    const [showModal, setShowModal] = useState(false);
    const [position, setPosition] = useState({ clientY: 0, height: 0, clientX: 0, width: 0 });
    const btnRef = useRef(null);
    const modalRef = useRef(null);
    const modalPosition = useMemo(() => `${position.clientY > position.height ? 'bottom-0' : 'top-0'} ${position.clientX > position.width ? 'right-[calc(100%+5px)]' : 'left-[calc(100%+5px)]'}`, [position]);

    const navigate = useNavigate();

    function handleOption (cbAction, values) {
        const navigateTo = cbAction(values);
        if (navigateTo) navigate(navigateTo);
        setShowModal(false);
    }
    function open () {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        setShowModal(true);
        setPosition({ height: window.innerHeight / 2, width: window.innerWidth / 2, clientX: rect.x, clientY: rect.y });
    }
    function close () {
        setShowModal(false);
    }

    return (
        <div className="relative" ref={modalRef}>
            {
                showModal &&
                <>
                    <div onClick={close} className="fixed z-[99999] top-0 left-0 backdrop-blur-sm bg-black/30 h-full w-full lg:w-[calc(100vw-300px)]" />
                    <ul className={`${modalPosition} absolute animate-slowfade shadow-lg overflow-hidden shadow-black/60 z-[999999] w-max flex flex-col border text-gray-200 text-sm font-semibold border-white/10 rounded-md bg-black/80 backdrop-blur-lg`}>
                        {
                            filteredOptions
                            .map( (option, num) => 
                                <Option 
                                    key={num} 
                                    option={option} 
                                    handleOption={handleOption} 
                                    song={song} 
                                    artist={artist} 
                                    album={album}
                                    genre={genre} 
                                    playlist={playlist} 
                                    radio={radio} 
                                    tracks={tracks} 
                                    i={i} 
                                /> 
                            )
                        }
                    </ul>
                </>
            }
            <OptionBtn open={open} btnRef={btnRef} iconSize={iconSize} optionType={type} />
        </div>
    )
}

export default Options
