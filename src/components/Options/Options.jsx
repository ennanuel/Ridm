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

    const open = (e) => {
        const rect = e.target.getBoundingClientRect()
        setShow(true);
        setPosition({height: window.innerHeight/2, width: window.innerWidth/2, clientX: rect.x, clientY: rect.y})
    }

    const close = () => {
        setShow(false)
    }

    return (
        <div className="relative" ref={modalRef}>
            {
                show &&
                    <>
                    <div onClick={close} className="fixed z-[99999] top-0 left-0 h-full w-full" />
                    <div
                        className={`absolute animate-slowfade shadow-lg overflow-hidden shadow-black/60 z-[999999] w-max flex flex-col border text-gray-200 text-sm font-semibold border-white/10 rounded-lg bg-black/80 backdrop-blur-lg ${position.clientY > position.height ? 'bottom-0' : 'top-0'} ${position.clientX > position.width ? 'right-[calc(100%+5px)]' : 'left-[calc(100%+5px)]'}`}
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
                    </>
            }
            <button 
                onClick={open}
                ref={btnRef} 
                className={`text-white flex items-center justify-center drop-shadow-lg`}
            >
                <BsThreeDots size={window.innerWidth || small ? 20 : 30} />
            </button>
        </div>
    )
}

export default Options
