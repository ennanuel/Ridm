import IconAndCloseButton from "./IconAndCloseButton";

const Survey = ({ selectAnswer, closeModal }) => {
    return (
        <div className="animate-fadein p-6 max-w-[400px] w-full min-h-[400px] bg-black/80 rounded-3xl border border-white/10 flex flex-col gap-6 shadow-xl shadow-black/10">
            <IconAndCloseButton closeModal={closeModal} />
            <div className="flex-1 flex flex-col justify-center gap-4">
                <h1 className="text-2xl font-bold text-white">Help Ridm Stay Online!</h1>
                <p className="text-sm text-gray-400">Due to high traffic, I've temporarily disabled some features. Please confirm you're not a robot so I can gather essential usage data. Thank you for your understanding!</p>
            </div>
            <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                <button onClick={() => selectAnswer('human')} className="h-10 rounded-lg bg-white border border-white hover:bg-white/90 text-black px-6 flex items-center justify-center">
                    <span className="font-semibold text-sm">Yes, I&apos;m human</span>
                </button>
                <button onClick={() => selectAnswer('fuck you, no one gives a shit')} className="h-10 rounded-lg border hover:border-transparent border-white/20 hover:bg-white/5 text-white px-6 flex items-center justify-center">
                    <span className="font-semibold text-sm">I don&apos;t care</span>
                </button>
            </div>
        </div>
    )
};

export default Survey;