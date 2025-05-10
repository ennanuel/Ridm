import { useState, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { options } from "../../utils/options";

import { filterOptions } from "../../utils/option";

import Option from './Option';
import OptionBtn from "./OptionBtn";
import { useDispatch } from "react-redux";
import { setNowPlaying } from "../../redux/features/playerSlice";

const getModalPosition = (position) => `${position.clientY > position.height ? 'bottom-0' : 'top-0'} ${position.clientX > position.width ? 'right-[calc(100%+5px)]' : 'left-[calc(100%+5px)]'}`;

const Options = ({ type, small, song, artist, genre, album, radio, playlist, tracks, i, favorite, blacklist }) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();

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
        closeModal();
        dispatch(setNowPlaying(false));
    }
    function openModal() {
        if (!btnRef.current) return;

        const rect = btnRef.current.getBoundingClientRect();
        setShowModal(true);
        setPosition({ height:( window.innerHeight / 2), width: (window.innerWidth / 2), clientX: rect.x, clientY: rect.y });
        
        document.getElementById('main-body')?.classList?.remove('overflow-y-scroll');
        document.getElementById('main-body')?.classList?.add('overflow-y-hidden');
    }
    function closeModal() {
        setShowModal(false);
        
        document.getElementById('main-body')?.classList?.add('overflow-y-scroll');
        document.getElementById('main-body')?.classList?.remove('overflow-y-hidden');
    }
    function handleClick(event) {
        if(!modalRef.current || !showModal) return;

        const modalRect = modalRef.current.getBoundingClientRect();
        const shouldCloseModal = event.clientX > modalRect.left + modalRect.width || 
            event.clientX < modalRect.left || 
            event.clientY > modalRect.top + modalRect.height || 
            event.clientY < modalRect.top;

        if(shouldCloseModal) closeModal();
    }

    return (
        <div className="relative">
            <OptionBtn openModal={openModal} btnRef={btnRef} small={small} optionType={type} />
            <ul 
                ref={modalRef}
                onClick={handleClick} 
                className={`${modalPosition} ${showModal ? 'flex' : 'hidden'} absolute animate-slowfade shadow-xl overflow-hidden shadow-black/20 z-[3] w-max flex-col text-gray-200 text-sm font-semibold rounded-[20px] bg-[#202020] min-w-[160px] before:z-[2] before:fixed before:top-0 before:left-0 before:w-full before:h-full`}
            >
                {
                    filteredOptions
                        .map((option, index) =>
                            <Option
                                key={index}
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
