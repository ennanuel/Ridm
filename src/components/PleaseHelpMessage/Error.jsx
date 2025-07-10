

const ErrorComponent = ({ closeModal, retry }) => {
    return (
        <div className="p-6 max-w-[400px] w-full aspect-square bg-black/80 rounded-3xl border border-white/10 flex flex-col gap-6 shadow-xl shadow-black/10">
            <IconAndCloseButton closeModal={closeModal} />
            <div className="flex-1 flex flex-col justify-center gap-4">
                <h1 className="text-2xl font-bold text-white">Damn!</h1>
                <p className="text-sm text-gray-400">It seems like your response couldn't be sent, sorry about that.</p>
            </div>
            <div className="flex justify-start items-center gap-4">
                <button onClick={retry} className="h-10 rounded-lg bg-red-400/10 hover:bg-red-400/20 text-red-200 px-6 flex items-center justify-center">
                    <span className="font-semibold text-sm">Try again</span>
                </button>
            </div>
        </div>
    )
};

export default ErrorComponent;