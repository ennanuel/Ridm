import { Songs, Albums, Artists, Genres, Radios } from './'

const Library = ({ library, favorites, blacklist, noFilter }) => (
    <>
    {
        Object.entries(library).map(
            ([entry, value], i) => {
                const title = entry === 'tracks' ? 'Song' : entry.substring(0, entry.length - 1)
                return (
                    <>
                    {
                        (entry === 'tracks' && value.length > 0) ?
                        <Songs key={i} favorites={favorites} blacklist={blacklist} noFilter={noFilter} songs={value}>{title}</Songs> :
                        (entry === 'albums' && value.length > 0) ?
                        <Albums key={i} favorites={favorites} blacklist={blacklist} noFilter={noFilter} albums={value}>{title}</Albums> :
                        (entry === 'artists' && value.length > 0) ?
                        <Artists key={i} favorites={favorites} blacklist={blacklist} noFilter={noFilter} artists={value}>{title}</Artists> :
                        (entry === 'genres' && value.length > 0) ?
                        <Genres key={i} favorites={favorites} blacklist={blacklist} noFiilter={noFilter} genres={value}>{title}</Genres> :
                        (entry === 'radios' && value.length > 0) &&
                        <Radios key={i} favorites={favorites} blacklist={blacklist} noFilter={noFilter} songs={value}>{title}</Radios>
                    }
                    </>
                )
            }
        )
    }
    </>
)

export default Library
