import { useDispatch } from "react-redux"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

import { addFavorites, removeFavorites } from "../../functions/library";

const FavoriteButton = ({data, type}) => {
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
            className={`border shadow shadow-black/20 border-red-500 h-[40px] md:h-[50px] w-[40px] md:w-[50px] flex items-center justify-center rounded-lg transition-[transform] active:scale-90 ${data?.favorite ? 'text-black bg-red-500' : 'text-red-500 bg-[#151515]'}`}
        >
            { data?.favorite ? <AiFillHeart size={30} /> : <AiOutlineHeart size={30} />} 
        </button>
    )
}

export default FavoriteButton
