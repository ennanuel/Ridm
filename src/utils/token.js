
const THREE_DAYS_IN_MILLISECONDS = 259200000;

export function createToken() {
    const newToken = Date.now();
    localStorage.setItem('userToken', String(newToken));
}

export function validateToken(token) {
    if(!token) return false;

    const tokenExpiryDate = Number(token) + THREE_DAYS_IN_MILLISECONDS;
    return tokenExpiryDate >= Date.now();
}

export function getVisitorToken() {
    return localStorage.getItem('userToken');
}

export function checkIfVisitorHasToken() {
    const token = getVisitorToken();
    const tokenValidation = validateToken(token);
    return tokenValidation;
}