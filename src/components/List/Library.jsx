import { Songs, Albums, Artists, Genres, Radios } from './'

const Library = ({ library }) => (
    <>
    {
        Object.entries(library).map(
            ([entry, value], i) => {
                const title = entry === 'tracks' ? 'Song' : entry.substring(0, entry.length - 2)
                return (
                    <>
                    {
                        (entry === 'tracks' && value.length > 0) ?
                        <Songs songs={value}>{title}</Songs> :
                        (entry === 'albums' && value.length > 0) ?
                        <Albums albums={value}>{title}</Albums> :
                        (entry === 'artists' && value.length > 0) ?
                        <Artists artists={value}>{title}</Artists> :
                        (entry === 'genres' && value.length > 0) ?
                        <Genres genres={value}>{title}</Genres> :
                        (entry === 'radios' && value.length > 0) &&
                        <Radios songs={value}>{title}</Radios>
                    }
                    </>
                )
            }
        )
    }
    </>
)

export default Library
