import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { Albums, Artists, Songs } from "../components/List";

import { useGetArtistAlbumQuery, useGetArtistDetailsQuery, useGetArtistsQuery, useGetSongsQuery } from "../redux/services/DeezerApi";
import { useContext, useEffect } from "react";
import { getSingleData } from "../utils/getData";
import { DetailsContext } from "../components/Details";

const ArtistDetails = () => {
    const { favorites, blacklist } = useSelector((state) => state.library);
    const { data, updateData, ...others } = useContext(DetailsContext);

    const { id: artistid } = useParams();

    const { data: artist, isFetching, error } = useGetArtistDetailsQuery(artistid);
    const { data: albums, isFetching: isFetchingAlbums, error: errorFetchingAlbums } = useGetArtistAlbumQuery(artistid);
    const { data: artists, isFetching: isFetchingArtists, error: errorFetchingArtists } = useGetArtistsQuery(artistid);

    const tracklist = useMemo(() => artist?.tracklist ? artist?.tracklist.match(/\d+/)[0] : 0, [artist]);
    const { data: tracks, isFetching: isFetchingSongs, error: errorFetchingSongs } = useGetSongsQuery(tracklist, 50);
    
    useEffect(() => updateData({ isFetching: true, error: false, data: {}, colors: [] }), [artistid]);

    useEffect(() => {
        const refinedData = getSingleData({ type: 'artists', data: artist, favorites, blacklist });

        updateData({ ...others, isFetching, error, data: { ...refinedData, tracks: tracks?.data, song: tracks?.data && tracks?.data[0] } });
    }, [artist, tracks, favorites, blacklist])

    useEffect(() => {
        const text = `Ridm Artist - ${isFetching ? 'Loading...' : error ? 'Something went wrong.' : artist?.name}`;

        document.getElementById('site_title').innerText = text;
    }, [artist])

    return (
        <div className="flex flex-col">
            <div className="p-2 md:p-4">
                <Albums
                    blacklist={blacklist}
                    favorites={favorites}
                    isFetching={isFetchingAlbums}
                    error={errorFetchingAlbums}
                    albums={albums?.data}
                    showSort={true}
                >
                    {data?.name} releases
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
