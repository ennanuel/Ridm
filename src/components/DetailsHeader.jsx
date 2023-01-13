import { Link } from 'react-router-dom'

const DetailsHeader = ({ artistId, artistData, songData }) => (
  <div className='relative w-full flex flex-col'>
    <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28">

      <div className="absolute inset-0 flex item-center">
        <img className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black" src={artistId ? artistData?.picture_medium : songData?.album.cover_medium} alt="artist image" />

        <div className="ml-5 flex justify-center flex-col">
          <p className="font-bold sm:text-3xl text-xl text-white">{artistId ? artistData?.name : songData?.title }</p>
          { !artistId &&
            <Link to={`/artists/${artistId ? artistData?.id : songData?.artist.id}`}>
              <p className="text-base text-gray-400 mt-2">{artistId ? artistData?.name : songData?.artist.name}</p>
            </Link>
          }
          {
            <Link to="/">
              <p className="text-xl text-gray-400 mt-2">{songData?.album.title}</p>
            </Link>
          }
        </div>
      </div>
    </div>
  </div>
);

export default DetailsHeader;
