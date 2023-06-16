import { useDispatch } from "react-redux"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

import { addFavorites, removeFavorites } from "../../functions/library";

const FavoriteButton = ({data, type, favorite}) => {
    const dispatch = useDispatch();

    return (
        <button 
            onClick={
                () => (
                    favorite ? 
                    addFavorites(dispatch, type, data) : 
                    removeFavorites(dispatch, type, data.id)
                )
            } 
            className={`border-2 shadow-md shadow-black/60 border-red-500 h-[40px] md:h-[50px] w-[40px] md:w-[50px] flex items-center justify-center rounded-lg opacity-80 transition-[transform,opacity] hover:opacity-100 active:scale-90 ${favorite ? 'text-black bg-red-500' : 'text-red-500 bg-black/50'}`}
        >
            { favorite ? <AiFillHeart size={30} /> : <AiOutlineHeart size={30} />} 
        </button>
    )
}

export default FavoriteButton
