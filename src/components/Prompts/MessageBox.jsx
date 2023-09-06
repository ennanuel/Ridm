import { useSelector } from "react-redux"

const MessageBox = () => {
    const { successMessage, displaySuccessMessage } = useSelector(state => state.prompt)
    
    return (
        displaySuccessMessage &&
        <section className="fixed z-[99999] flex items-center justify-center w-full lg:w-[80%] pointer-events-none right-0 bottom-0 pb-10 animate-showmessage translate-y-[100%]">   
            <p className="max-w-[250px] rounded-sm bg-black/80 backdrop-blur-xl border-white/10 border-2 font-semibold text-center text-gray-300 text-sm md:text-base py-2 px-6 shadow-lg shadow-black/90">
                {successMessage}
            </p>
        </section>
    )
}

export default MessageBox
