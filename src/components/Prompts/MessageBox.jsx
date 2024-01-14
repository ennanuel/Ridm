import { useSelector } from "react-redux";
import { MdAdd } from "react-icons/md";
import { hideMessage } from "../../utils/prompt";

const MessageBox = () => {
    const { successMessage, displaySuccessMessage } = useSelector(state => state.prompt);

    if (!displaySuccessMessage) return;
    
    return (
        <section className="fixed z-[99999] flex items-center justify-center w-full lg:w-[80%] right-0 bottom-10 animate-showmessage">   
            <div className="max-w-[250px] rounded-sm bg-white/10 backdrop-blur flex items-center gap-4 font-semibold text-white py-2 pl-4 pr-2 shadow-md shadow-black/20">
                <p className="text-white text-sm md:text-base flex-1">{successMessage}</p>
                <button onClick={hideMessage} className="flex items-center justify-center rotate-45">
                    <MdAdd size={20} />
                </button>
            </div>
        </section>
    )
}

export default MessageBox
