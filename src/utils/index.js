

export function generateArray(size) {
    if (!size || typeof (size) !== 'number' || size < 1) return [];
    const values = [];
    for (let i = size; i > 0 && values.length <= size; i--) `${values.push(Math.ceil(Math.random() * 100))}%`;
    return values;
}