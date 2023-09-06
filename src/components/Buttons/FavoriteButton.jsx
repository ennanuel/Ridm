import { useDispatch } from "react-redux"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

import { addFavorites, removeFavorites } from "../../functions/library";

const FavoriteButton = ({data, type, small}) => {
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
            className={
                small ?
                    'flex items-center justify-center text-white' :
                    `border shadow shadow-black/20 border-red-500/20 h-[40px] md:h-[50px] w-[40px] md:w-[50px] flex items-center justify-center rounded-lg transition-[transform] active:scale-90 ${data?.favorite ? 'text-black bg-red-500' : 'text-red-700 bg-white/20'}`
            }
        >
            {
                data?.favorite ?
                    <AiFillHeart size={window.innerWidth < 1024 ? 15 : small ? 20 : 30} /> :
                    <AiOutlineHeart size={window.innerWidth < 1024 ? 15 : small ? 20 : 30} />
            } 
        </button>
    )
}

export default FavoriteButton
