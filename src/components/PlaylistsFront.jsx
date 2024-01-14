import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Playlists } from './List';
import { Options } from './Options';

const PlaylistsFront = ({ isInAddPage }) => {
    const { playlists } = useSelector(state => state.library);
    const navigate = useNavigate();
    return (
        <div className={`min-w-full transition-transform ${isInAddPage && 'translate-x-[-110%]'}`}>
            <div className="w-full flex justify-between items-center mb-4">
                <h3 className="font-bold text-white text-xl">Playlists</h3>
                <Options type="playlists" navigate={navigate} />
            </div>
            {
                playlists.length < 1 ?
                    <div className="mt-[-40px] flex flex-col items-center justify-center gap-4 h-[90vh]">
                        <h3 className="text-gray-400 font-bold text-xl">You don't have any saved playlists</h3>
                        <Link to="/playlists?add=true" className="flex items-center justify-center font-bold text-xs md:text-sm bg-gray-400 text-black border border-gray-400 px-3 h-[28px] md:h-[36px] rounded-[18px] hover:text-gray-400 hover:bg-transparent transition-[background-color]">Create New</Link>
                    </div> :
                    <Playlists playlists={playlists} />
            }
        </div>
    )
};

export default PlaylistsFront
