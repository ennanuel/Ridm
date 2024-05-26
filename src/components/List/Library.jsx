import { Songs, Albums, Artists, Genres, Radios } from './'

const Library = ({ library, noFilter }) => (
    <>
        {
            Object.entries(library).map(
                ([entry, value], i) => (
                    <>
                        {
                            (entry === 'tracks' && value.length > 0) ?
                                <Songs key={i} noFilter={noFilter} songs={value}>songs</Songs> :
                                (entry === 'albums' && value.length > 0) ?
                                    <Albums key={i} noFilter={noFilter} albums={value}>{entry}</Albums> :
                                    (entry === 'artists' && value.length > 0) ?
                                        <Artists key={i} noFilter={noFilter} artists={value}>{entry}</Artists> :
                                        (entry === 'genres' && value.length > 0) ?
                                            <Genres key={i} noFiilter={noFilter} genres={value}>{entry}</Genres> :
                                            (entry === 'radios' && value.length > 0) &&
                                            <Radios key={i} noFilter={noFilter} radios={value}>{entry}</Radios>
                        }
                    </>
                ))
        }
    </>
);

export default Library
