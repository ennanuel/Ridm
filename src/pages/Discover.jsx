import { useState, useEffect, useMemo } from 'react'

import { useGetRecentReleasesQuery, useGetTopRadiosQuery, useGetTopChartQuery, useGetRadioTracksQuery } from "../redux/services/DeezerApi";

import { useSelector } from "react-redux";
import { Radios, RecentArtists, RecentAlbums, Suggestion } from "../components/List";
import { getData } from "../utils/getData";

const Discover = () => {
    const library = useSelector(state => state.library);
    // feels like you fell right on my head, gave you a way to the wind, I hope it was worth it anyway, us against the world... if I keep you here I'd only be doing it for myself

    const { data, isFetching: isFetchingTopCharts, error: errorFetchingTopCharts } = useGetTopChartQuery(0);
    const topTracks = useMemo(() => data ? getData({ data: data.tracks.data.slice(0, 5), type: 'tracks' }) : [], [data, library]);
    const topArtists = useMemo(() => data ? getData({ data: data.artists.data.slice(0, 10), type: 'artists' }) : [], [data, library]);
    
    const { data: radios, isFetching, error } = useGetTopRadiosQuery();
    const topRadio = useMemo(() => radios?.data ? radios.data[0] : { id: 0 }, [radios]);
    const { data: radio, isFetching: fetchingRadioTracks, error: errorFetchingRadioTracks } = useGetRadioTracksQuery(topRadio.id);

    const { data: recentAlbums, isFetching: isFetchingRecentAlbums, error: errorFetchingRecentAlbums } = useGetRecentReleasesQuery(0);

    useEffect(() => {   
        document.getElementById('site_title').innerText = 'Ridm - Web Player: Rhythm for everyone.'
    }, [])

    return (
        <div className="flex flex-col p-4 gap-10 lg:gap-6">
            <RecentAlbums
                isFetching={isFetchingRecentAlbums}
                error={errorFetchingRecentAlbums}
                albums={recentAlbums?.data}
            />
            <Suggestion
                isFetching={fetchingRadioTracks}
                error={errorFetchingRadioTracks}
                radioTracks={radio?.data}
                radio={topRadio}
                songs={topTracks}
            />
            <RecentArtists
                isFetching={isFetchingTopCharts}
                error={errorFetchingTopCharts}
                artists={topArtists}
            />
            <Radios 
                isFetching={isFetching} 
                error={error} 
                radios={radios?.data?.slice(0, 4)}
                showmore={true}
                genreid={0}
            >
                Popular Radios
            </Radios>
        </div>
    )
};

export default Discover;
