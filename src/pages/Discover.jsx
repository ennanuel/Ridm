import { useState, useEffect } from 'react'

import { Radios } from "../components/List"

import { useGetRecentReleasesQuery, useGetTopRadiosQuery, useGetTopChartQuery, useGetRadioTracksQuery } from "../redux/services/DeezerApi";

import { useDispatch, useSelector } from "react-redux";
import RecentAlbums from "../components/List/RecentAlbums";
import Suggestion from "../components/List/Suggestion";
import RecentArtists from "../components/List/RecentArtists";

import { getData } from "../functions/getData";

const Discover = () => {
    const { blacklist, favorites } = useSelector( state => state.library )
    const [topPlays, setTopPlays] = useState([])
    const [topArtists, setTopArtists] = useState([])

    const dispatch = useDispatch()
    // feels like you fell right on my head, gave you a way to the wind, I hope it was worth it anyway, us against the world... if I keep you here I'd only be doing it for myself

    const { data: radios, isFetching, error } = useGetTopRadiosQuery()
    const { data: recentAlbums, isFetching: isFetchingRecentAlbums, error: errorFetchingRecentAlbums } = useGetRecentReleasesQuery( 0 )
    const { data, isFetching: isFetchingTopCharts, error: errorFetchingTopCharts } = useGetTopChartQuery( 0 )
    const { data: radio, isFetching: fetchingRadioTracks, error: errorFetchingRadioTracks } = useGetRadioTracksQuery(radios?.data ? radios.data[0].id : 0)

    useEffect(() => {
        setTopPlays(getData({type: 'tracks', data: data?.tracks?.data?.slice(0, 10), blacklist, favorites}))
        setTopArtists(getData({type: 'artists', data: data?.artists?.data?.slice(0, 10), blacklist, favorites}))
    }, [data, favorites, blacklist])

    useEffect(() => {   
        document.getElementById('site_title').innerText = 'Ridm - Web Player: Rhythm for everyone.'
    }, [])

    return (
        <div className="flex flex-col p-4 gap-10 lg:gap-1">
            <RecentAlbums isFetching={isFetchingRecentAlbums} error={errorFetchingRecentAlbums} albums={recentAlbums?.data} />
            <Suggestion blacklist={blacklist} favorites={favorites} isFetching={fetchingRadioTracks} error={errorFetchingRadioTracks} radioTracks={radio?.data} radio={radios?.data ? radios?.data[0] : {}} dispatch={dispatch} songs={topPlays} />
            <RecentArtists isFetching={isFetchingTopCharts} error={errorFetchingTopCharts} artists={topArtists} />

            <Radios 
                isFetching={isFetching} 
                error={error} 
                radios={radios?.data?.slice(0, 4)}
                favorites={favorites}
                blacklist={blacklist}
                showmore={true}
                genreid={0}
            >
                Popular Radios
            </Radios>
        </div>
    )
};

export default Discover;
