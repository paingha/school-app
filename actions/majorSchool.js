export function errorMajorSchool(error) {
    return {
        type: 'ERROR_MAJORSCHOOL',
        error
    }
}

export function requestMajorSchool() {
    return {
        type: 'REQUEST_MAJORSCHOOL'
    }
}

export function receiveMajorSchool(majorSchool) {
    return {
        type: 'RECEIVE_MAJORSCHOOL',
        majorSchool
    }
}