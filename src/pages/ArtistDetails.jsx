import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { DetailsHeader } from "../components/Headers";
import { FavoriteButton } from "../components/Buttons";
import { Options } from "../components/Options";
import { Albums, Artists, Songs } from "../components/List"

import { useGetArtistAlbumQuery, useGetArtistDetailsQuery, useGetArtistsQuery, useGetSongsQuery } from "../redux/services/DeezerApi";
import { useEffect, useState } from "react";
import { getSingleData } from "../functions/getData";

const ArtistDetails = () => {
    const { favorites, blacklist } = useSelector( (state) => state.library )

    const [data, setData] = useState({})

    const { id: artistid } = useParams()

    const { data: artist, isFetching, error } = useGetArtistDetailsQuery( artistid )
    const { data: tracks, isFetching: isFetchingSongs, error: errorFetchingSongs } = useGetSongsQuery( artist?.tracklist.match(/[\d]+/)[0] || 0, 50)
    const { data: albums, isFetching: isFetchingAlbums, error: errorFetchingAlbums } = useGetArtistAlbumQuery( artistid )
    const { data: artists, isFetching: isFetchingArtists, error: errorFetchingArtists } = useGetArtistsQuery( artistid )

    useEffect(() => {
        setData(getSingleData({type: 'artists', data: artist, favorites, blacklist}))
    }, [artist, favorites, blacklist])

    useEffect(() => {
        const text = `Ridm Artist - ${isFetching ? 'Loading...' : error ? 'Something went wrong.' : artist?.name}`
        document.getElementById('site_title').innerText = text
    }, [artist])

    return (
        <div className="flex flex-col">
            <DetailsHeader isFetching={isFetching} error={error} artistId={artistid} artistData={data} />
            
            {
                artist && 
                <div className="flex-1 flex flex-row justify-start overflow-x-clip items-center gap-4 m-4 mb-0">
                    <FavoriteButton data={data} type="artists" />
                    <Options 
                        type="artist" 
                        artist={data} 
                        tracks={tracks?.data} 
                        song={tracks?.data && tracks.data[0]} 
                        favorite={data?.favorite}
                        blacklist={data?.blacklist}
                        i={0} 
                    />
                </div>
            }

            <p className="text-gray-400 mx-4 mt-2 mb-5 text-sm font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nulla quaerat, a atque, repellendus quam explicabo ipsa qui in id ducimus earum architecto numquam vero rem at doloremque sapiente? Mollitia.</p>
            <p className="text-gray-400 mx-4 mt-2 mb-5 text-sm font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nulla quaerat, a atque, repellendus quam explicabo ipsa qui in id ducimus earum architecto numquam vero rem at doloremque sapiente? Mollitia.</p>

            <div className="p-2 md:p-4">
                <Albums 
                    blacklist={blacklist} 
                    favorites={favorites} 
                    isFetching={isFetchingAlbums} 
                    error={errorFetchingAlbums} 
                    albums={albums?.data} 
                    showSort={true}
                >
                    Popular {data?.name} albums
                </Albums>
                <Songs 
                    blacklist={blacklist}
                    favorites={favorites}
                    isFetching={isFetchingSongs}
                    error={errorFetchingSongs}
                    songs={tracks?.data} 
                    artist={data} 
                    artistId={artistid}
                > 
                    Songs By {data?.name}
                </Songs>
                <Artists 
                    blacklist={blacklist}
                    favorites={favorites}
                    isFetching={isFetchingArtists}
                    error={errorFetchingArtists}
                    artists={artists?.data}
                >
                    Similar Artists
                </Artists>
            </div>
        </div>
    )
};

export default ArtistDetails;
