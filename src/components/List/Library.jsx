import { Songs, Albums, Artists, Genres, Radios } from './'

const Library = ({ library, favorites, blacklist }) => (
    <>
    {
        Object.entries(library).map(
            ([entry, value], i) => {
                const title = entry === 'tracks' ? 'Song' : entry.substring(0, entry.length - 1)
                return (
                    <>
                    {
                        (entry === 'tracks' && value.length > 0) ?
                        <Songs favorites={favorites} blacklist={blacklist} songs={value}>{title}</Songs> :
                        (entry === 'albums' && value.length > 0) ?
                        <Albums favorites={favorites} blacklist={blacklist} albums={value}>{title}</Albums> :
                        (entry === 'artists' && value.length > 0) ?
                        <Artists favorites={favorites} blacklist={blacklist} artists={value}>{title}</Artists> :
                        (entry === 'genres' && value.length > 0) ?
                        <Genres favorites={favorites} blacklist={blacklist} genres={value}>{title}</Genres> :
                        (entry === 'radios' && value.length > 0) &&
                        <Radios favorites={favorites} blacklist={blacklist} songs={value}>{title}</Radios>
                    }
                    </>
                )
            }
        )
    }
    </>
)

export default Library
