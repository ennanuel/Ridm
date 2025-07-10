

const Loading = ({ closeModal }) => {
    return (
        <div className="p-6 max-w-[400px] w-full aspect-square bg-black/80 rounded-3xl border border-white/10 flex flex-col shadow-xl shadow-black/10">
            <IconAndCloseButton closeModal={closeModal} />
            <div className="flex flex-col items-center justify-center gap-4 flex-1">
                <span className="block w-12 aspect-square rounded-full border-[3px] border-t-white border-gray-600 animate-infiniterotate"></span>
                <p className="text-sm text-gray-200">Just a sec...</p>
            </div>
        </div>
    )
};

export default Loading;