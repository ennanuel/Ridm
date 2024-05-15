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
            style={{
                backgroundColor: text ? text.replace(')', ',.8') : ''
            }}
            className={`flex items-center justify-center ${small ? 'text-white drop-shadow-lg drop-shadow-black/50' : 'text-white md:w-[50px] md:h-[50px] w-[40px] h-[40px] bg-white/5'} transition-transform active:scale-90 rounded-full`}
        >
            {
                data?.favorite ?
                    <AiFillHeart size={small ? 20 : 25} /> :
                    <AiOutlineHeart size={small ? 20 : 25} />
            }
        </button>
    )
};

export default FavoriteButton
