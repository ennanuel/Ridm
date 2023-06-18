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

    const { data: radios, isFetching, error } = useGetTopRadiosQuery()
    const { data: recentAlbums, isFetching: isFetchingRecentAlbums, error: errorFetchingRecentAlbums } = useGetRecentReleasesQuery( 0 )
    const { data, isFetching: isFetchingTopCharts, error: errorFetchingTopCharts } = useGetTopChartQuery( 0 )
    const { data: radio, isFetching: fetchingRadioTracks, error: errorFetchingRadioTracks } = useGetRadioTracksQuery(radios?.data ? radios.data[0].id : 0)

    useEffect(() => {
        setTopPlays(getData({type: 'tracks', data: data?.tracks?.data?.slice(0, 10), blacklist, favorites}))
        setTopArtists(getData({type: 'artists', data: data?.artists?.data?.slice(0, 10), blacklist, favorites}))
    }, [data, favorites, blacklist])

    return (
        <div className="lg:mt-[70px] mt-4 flex flex-col px-2 md:px-4">
            <RecentAlbums isFetching={isFetchingRecentAlbums} error={errorFetchingRecentAlbums} albums={recentAlbums?.data} />
            <Suggestion isFetching={fetchingRadioTracks} error={errorFetchingRadioTracks} radioTracks={radio?.data} radio={radios?.data ? radios?.data[0] : {}} dispatch={dispatch} songs={topPlays} />
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
