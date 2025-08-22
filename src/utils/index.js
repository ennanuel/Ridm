

export function generateArray(size) {
    if (!size || typeof (size) !== 'number' || size < 1) return [];
    const values = [];
    for (let i = size; i > 0 && values.length <= size; i--) {
        const value = `${Math.ceil(Math.random() * 100)}%`;
        values.push(value);
    }
    return values;
}

export function cleanUpLyrics(rawLyrics) {
    return rawLyrics
        ?.lyrics
        ?.split(/(\n|\r)/ig)
        ?.filter((line) => line && !/(\n|\r)/.test(line))
};