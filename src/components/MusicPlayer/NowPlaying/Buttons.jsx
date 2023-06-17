import { BiChevronRight, BiChevronLeft } from "react-icons/bi"

import ExpandCollapse from "../ExpandCollapse"

const Buttons = ({handleClick, nowPlaying, setMove, move}) => {
  return (
    <div className="absolute w-fit h-fit z-[10] lg:top-0 lg:left-0 lg:m-5 md:my-[8vh] sm:my-[7vh] my-[6.5vh] mx-[30px] bottom-0 right-0 flex items-center gap-4">
        <button onClick={() => setMove(prev => !prev)} className="lg:hidden text-black rounded-md bg-gray-200">
            {
                !move ?
                <BiChevronLeft size={30} /> :
                <BiChevronRight size={30} />
            }
        </button>
        <ExpandCollapse onClick={handleClick} nowPlaying={nowPlaying} />
    </div>
  )
}

export default Buttons
