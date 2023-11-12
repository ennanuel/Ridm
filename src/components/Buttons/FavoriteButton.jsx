import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

import { addFavorites, removeFavorites } from "../../utils/library";

const FavoriteButton = ({ data, type, small, text }) => {

    return (
        <button
            onClick={
                () => (
                    data?.favorite ?
                        removeFavorites(type, data.id) :
                        addFavorites(type, data)
                )
            }
            style={{ color: text }}
            className={'flex items-center justify-center text-white drop-shadow-lg drop-shadow-black/50 transition-transform active:scale-90'}
        >
            {
                data?.favorite ?
                    <AiFillHeart size={small ? 20 : 40} /> :
                    <AiOutlineHeart size={small ? 20 : 40} />
            }
        </button>
    )
};

export default FavoriteButton
