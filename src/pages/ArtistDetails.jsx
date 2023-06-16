import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { DetailsHeader } from "../components/Headers";
import { FavoriteButton } from "../components/Buttons";
import { Options } from "../components/Options";
import { Albums, Artists, Songs } from "../components/List"

import { useGetArtistAlbumQuery, useGetArtistDetailsQuery, useGetArtistsQuery, useGetSongsQuery } from "../redux/services/DeezerApi";

const ArtistDetails = () => {
    const { favorites: {artists: favoriteArtists, ...others} } = useSelector( (state) => state.library )

    const { id: artistid } = useParams()

    const { data, isFetching, error } = useGetArtistDetailsQuery( artistid )
    const { data: tracks } = useGetSongsQuery( data?.tracklist.match(/[\d]+/)[0] || 0, 50)
    const { data: albums } = useGetArtistAlbumQuery( artistid )
    const { data: artists } = useGetArtistsQuery( data?.id )

    return (
        <div className="flex flex-col">
            <DetailsHeader isFetching={isFetching} error={error} artistId={artistid} artistData={data} />
            
            <div className="flex-1 flex flex-row justify-start overflow-x-clip items-center gap-4 m-4 mb-0">
                <FavoriteButton data={data} type="artists" favorite={data?.favorite} />
                <Options 
                    type="artist" 
                    artist={data} 
                    favorite={data?.favorite} 
                    tracks={tracks?.data} 
                    song={tracks?.data && tracks.data[0]} 
                    i={0} 
                />
            </div>

            <p className="text-gray-400 mx-4 mt-2 mb-5 text-sm font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nulla quaerat, a atque, repellendus quam explicabo ipsa qui in id ducimus earum architecto numquam vero rem at doloremque sapiente? Mollitia.</p>
            <p className="text-gray-400 mx-4 mt-2 mb-5 text-sm font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nulla quaerat, a atque, repellendus quam explicabo ipsa qui in id ducimus earum architecto numquam vero rem at doloremque sapiente? Mollitia.</p>

            <Albums albums={albums?.data} showSort={true}>
                Popular {data?.name} albums
            </Albums>
            <Songs songs={tracks?.data} artist={data} artistId={artistid}> 
                Songs By {data?.name}
            </Songs>
            <Artists artists={artists?.data}>
                Similar Artists
            </Artists>
        </div>
    )
};

export default ArtistDetails;
