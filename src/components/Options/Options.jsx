import { useState, useRef, useEffect } from "react"
import { BsThreeDots } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { options } from "../../assets/data/options"

import { loadOptions } from "../../functions/option"

import Option from './Option'

const Options = ({type, small, song, artist, genre, album, radio, playlist, tracks, i, favorite, playlists, blacklist }) => {
    const filteredOptions = loadOptions({options, type, playlists, favorite, blacklist, small})

    const [show, setShow] = useState(false)
    const [position, setPosition] = useState({})
    const btnRef = useRef()
    const modalRef = useRef()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleOption = (func, values) => {
        func(values)
        setShow(false)
    }

    const handleWindowClick = (e) => {
        const modalBox = modalRef.current.getBoundingClientRect()

        if((e.clientX < modalBox.x + modalBox.width && e.clientX > modalBox.x) && (e.clientY < modalBox.y + modalBox.height && e.clientY > modalBox.y)) return;

        close();
    }

    const open = (e) => {
        window.removeEventListener('click', handleWindowClick)

        const rect = e.target.getBoundingClientRect()
        setShow(true);
        setPosition({height: window.innerHeight/2, width: window.innerWidth/2, clientX: rect.x, clientY: rect.y})

        window.addEventListener('click', handleWindowClick)
    }

    const close = () => {
        setShow(false)
        window.removeEventListener('click', handleWindowClick)
    }

    return (
        <div className="relative" ref={modalRef}>
            {
                show &&
                <div
                    className={`absolute animate-slowfade shadow-lg overflow-hidden shadow-black/60 z-[2] w-max flex flex-col border text-gray-200 text-sm font-semibold border-white/10 rounded-lg bg-black/80 backdrop-blur-lg ${position.clientY > position.height ? 'bottom-0' : 'top-0'} ${position.clientX > position.width ? 'right-[calc(100%+5px)]' : 'left-[calc(100%+5px)]'}`}
                >
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
                                dispatch={dispatch} 
                                navigate={navigate} 
                            /> 
                        )
                    }
                </div>
            }
            <button 
                onClick={open}
                ref={btnRef} 
                className={`${small ? "text-white flex items-center justify-center" : "h-[40px] md:h-[50px] w-[40px] md:w-[50px] rounded-lg flex items-center justify-center bg-white/20 border border-gray-200/10 text-white shadow shadow-black/30"}`}
            >
                <BsThreeDots size={window.innerWidth < 1024 ? 15 : small ? 20 : 30} />
            </button>
        </div>
    )
}

export default Options
