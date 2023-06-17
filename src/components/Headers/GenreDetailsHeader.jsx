import { FavoriteButton } from "../Buttons"
import { Error } from "../LoadersAndError"
import HeaderLoading from "../LoadersAndError/HeaderLoading"
import { Options } from "../Options"

const GenreDetailsHeader = ({ genre, charts, isFetching, error }) => {
  return (
    <div
        style={{
            background: `center / cover url(${genre?.picture_xl})`,
            backgroundAttachment: 'fixed',
        }}
        className="relative w-full h-[50vh] shadow-xl shadow-black/50"
    >
        <div className="absolute bg-black/60 w-full h-full top-0 left-0" />
        {
            isFetching ?
            <HeaderLoading /> :
            error ?
            <Error title="Could not load genre details" /> :
                <div className="relative h-full w-full flex justify-between flex-wrap items-end gap-2 p-2 md:px-4 md:py-8">
                    <div className="flex-1">
                        <p className="text-gray-300 text-sm font-bold">{genre?.type}</p>
                        <h2 className="text-white font-bold text-3xl md:text-[5em] mt-2">{genre?.name}</h2>
                    </div>
            
                    <div className="flex flex-row justify-end items-center gap-4 relative md:top-4">
                        <FavoriteButton data={genre} type="genres" />
                        <Options 
                            type="genre" 
                            favorite={genre?.favorite} 
                            blacklist={genre?.blacklist}
                            genre={genre} 
                            tracks={charts?.tracks?.data} 
                            song={charts && charts.tracks.data[0]} 
                            i={0} 
                        />
                    </div>
                </div>
        }
    </div>
  )
}

export default GenreDetailsHeader
