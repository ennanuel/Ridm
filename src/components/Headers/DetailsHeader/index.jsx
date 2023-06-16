import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaDeezer } from 'react-icons/fa'
import { BsDot } from 'react-icons/bs'
import { MdExplicit } from 'react-icons/md'
import Contributors from './Contributors'
import AlbumInfo from './AlbumInfo'
import SongInfo from './SongInfo'
import Header from './Header'
import GenresAndLink from './GenresAndLink'
import { HeaderLoading, Error } from '../../LoadersAndError'

const DetailsHeader = ({ isFetching, error, artistId, artistData, songData, albumData }) => {
  const { isPlaying } = useSelector( (state) => state.player )
  
  const contributors = !artistId && songData ? songData.contributors : albumData ? albumData.contributors : artistData && artistData.contributors
  const style = {
    background: `center / cover url(${artistId ? artistData?.picture_xl : albumData ? albumData?.cover_xl : songData?.album.cover_xl})`,
    backgroundAttachment: 'fixed'
  }

  return (
    <div
      className={`detail_img ${isPlaying ? 'change_shadow' : 'normal_shadow'} transition-[box-shadow] relative h-[60vh] w-full flex flex-col justify-end`}
      style={style}
    >
      {
        isFetching ?
        <HeaderLoading /> :
        error ?
        <Error title="Could not load details" /> :
        <>
        <Header artistId={artistId} artistData={artistData} albumData={albumData} songData={songData} />
        <div className="mx-4 flex flex-row flex-wrap gap-y-2 items-center relative mb-2 ">
          <Contributors contributors={contributors || []} />
          
          <h3 className="font-semibold w-fit text-gray-300 flex flex-row items-center text-xs">
            <AlbumInfo albumData={albumData} songData={songData} artistData={artistData} artistId={artistId} />
            <BsDot size={20} />
            <SongInfo albumData={albumData} songData={songData} />
          </h3>
        </div>
        <GenresAndLink artistId={artistId} albumData={albumData} />
        </>
      }
    </div>
  )
}
  
export default DetailsHeader;