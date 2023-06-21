import { BiCollapseAlt, BiExpand } from 'react-icons/bi'

const ExpandCollapse = ({nowPlaying, onClick}) => {
    return (
        <button 
            className={`h-[35px] w-[35px] flex justify-center items-center rounded-md opacity-80 bg-black text-gray-200 lg:bg-white/20 lg:text-gray-400 cursor-pointer transition-[opacity,transform] lg:rotate-0 rotate-90 hover:opacity-100 hover:text-gray-100 active:scale-75 active:bg-gray-200 p-1`}
            onClick={onClick}
        >
            {
                nowPlaying ?
                <BiCollapseAlt
                    size={25}
                /> :
                <BiExpand
                    size={25}
                />
            }
        </button>
    )
}

export default ExpandCollapse
