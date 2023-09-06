import { useDispatch } from "react-redux"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

import { addFavorites, removeFavorites } from "../../functions/library";

const FavoriteButton = ({data, type, small, text}) => {
    const dispatch = useDispatch();

    return (
        <button 
            onClick={
                () => (
                    data?.favorite ?
                    removeFavorites(dispatch, type, data.id) : 
                    addFavorites(dispatch, type, data) 
                )
            } 
            style={{ color: text }}
            className={'flex items-center justify-center text-white drop-shadow-lg drop-shadow-black/50 transition-transform active:scale-90'}
        >
            {
                data?.favorite ?
                    <AiFillHeart size={window.innerWidth < 1024 ? 15 : small ? 20 : 40} /> :
                    <AiOutlineHeart size={window.innerWidth < 1024 ? 15 : small ? 20 : 40} />
            } 
        </button>
    )
}

export default FavoriteButton
