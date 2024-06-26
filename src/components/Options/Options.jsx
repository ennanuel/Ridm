import { useState, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { options } from "../../utils/options";

import { filterOptions } from "../../utils/option";

import Option from './Option';
import OptionBtn from "./OptionBtn";

const getModalPosition = (position) => `${position.clientY > position.height ? 'bottom-0' : 'top-0'} ${position.clientX > position.width ? 'right-[calc(100%+5px)]' : 'left-[calc(100%+5px)]'}`;

const Options = ({ type, small, song, artist, genre, album, radio, playlist, tracks, i, favorite, blacklist }) => {
    const { pathname } = useLocation();

    const filteredOptions = useMemo(() => filterOptions({ options, type, favorite, blacklist, isInPlaylistPath: /\/playlists\//.test(pathname) }), [pathname, blacklist, favorite, playlist]);

    const [showModal, setShowModal] = useState(false);
    const [position, setPosition] = useState({ clientY: 0, height: 0, clientX: 0, width: 0 });

    const btnRef = useRef(null);
    const modalRef = useRef(null);

    const modalPosition = useMemo(() => getModalPosition(position), [position]);

    const navigate = useNavigate();

    function handleOption(cbAction, values) {
        const navigateTo = cbAction(values);
        if (navigateTo) navigate(navigateTo);
        setShowModal(false);
    }
    function open() {
        if (!btnRef.current) return;

        const rect = btnRef.current.getBoundingClientRect();
        setShowModal(true);
        setPosition({ height: window.innerHeight / 2, width: window.innerWidth / 2, clientX: rect.x, clientY: rect.y });
    }

    return (
        <div className="relative" ref={modalRef}>
            <OptionBtn open={open} btnRef={btnRef} small={small} optionType={type} />
            <ul className={`${modalPosition} ${showModal ? 'hover:pointer-events-auto hover:flex' : 'hover:pointer-events-none hover:hidden' } hidden pointer-events-none peer-focus:flex peer-focus:pointer-events-auto absolute z-1 animate-slowfade shadow-lg overflow-hidden shadow-black/60 z-[999999] w-max flex-col text-gray-200 text-sm font-semibold rounded-[20px] bg-black/80 backdrop-blur-lg`}>
                {
                    filteredOptions
                        .map((option, num) =>
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
        </div>
    )
}

export default Options
