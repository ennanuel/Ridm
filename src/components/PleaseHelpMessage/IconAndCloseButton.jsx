import { MdClose } from "react-icons/md";
import { logo } from "../../assets/images"

const IconAndCloseButton = ({ closeModal }) => {
    return (
        <div className="flex justify-between items-center">
            <img src={logo} className="w-10 aspect-square object-contain" />
            <button onClick={closeModal} className="focus:outline-none flex items-center justify-center w-10 aspect-square rounded-full text-white hover:text-red-300 hover:bg-red-400/10">
                <MdClose size={20} />
            </button>
        </div>
    )
};

export default IconAndCloseButton;