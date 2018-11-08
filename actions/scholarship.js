export function errorScholarship(error) {
    return {
        type: 'ERROR_SCHOLARSHIP',
        error
    }
}

export function requestScholarship() {
    return {
        type: 'REQUEST_SCHOLARSHIP'
    }
}

export function receiveScholarship(scholarship) {
    return {
        type: 'RECEIVE_SCHOLARSHIP',
        scholarship
    }
}