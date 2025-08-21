
import { useMemo } from 'react';
import { useGetLyricsQuery } from '../../redux/services/LyricsApi';
import { LyricLoading, Error } from '../LoadersAndError';

export default function SongLyrics ({ songId, showBlur, nowPlaying = false }) {
    const { data, isFetching, error } = useGetLyricsQuery(songId);
    const lyrics = useMemo(() => (
        data
            ?.lyrics
            ?.split(/(\n|\r)/ig)
            ?.filter((line) => line && !/(\n|\r)/.test(line))
    ), [data]);
    
    if(isFetching) return <LyricLoading num={8} />

    if(error) return <Error title="Could not load lyrics." />
        
    return (
        <div className={`mb-8 flex flex-col gap-3 ${showBlur ? 'border border-white/5 rounded-xl backdrop-blur-lg p-3 md:p-4 lg:p-6' : 'px-3 md:px-4 lg:px-6'}`}>
            <Lyrics lyrics={lyrics} isNowPlaying={nowPlaying} />
            <p className="text-xs text-zinc-500">
                <span>Lyrics provided by </span>
                <a href="https://lyrics.ovh/" target="_blank" className="text-zinc-400 hover:underline font-semibold">{'Lyrics.ovh'}</a>
            </p>
        </div>
    )
};

function Lyrics({ lyrics, isNowPlaying }) {
    return (
        <div className="flex flex-col gap-6">
            { !isNowPlaying ? <h3 className="text-2xl font-bold text-zinc-100">Lyrics</h3> : null }

            <div className="flex flex-col gap-2">
                {
                    Boolean(lyrics?.length) ?
                        lyrics?.map((line) => (<p className="text-zinc-300 text-base font-bold my-1">{line}</p>)) :
                        <p className="text-gray500 text-2xl font-bold text-zinc-300">Sorry, no lyrics found</p>
                }
            </div>
        </div>
    );
};
