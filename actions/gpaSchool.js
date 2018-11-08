export function errorGpaSchool(error) {
    return {
        type: 'ERROR_GPASCHOOL',
        error
    }
}

export function requestGpaSchool() {
    return {
        type: 'REQUEST_GPASCHOOL'
    }
}

export function receiveGpaSchool(gpaSchool) {
    return {
        type: 'RECEIVE_GPASCHOOL',
        gpaSchool
    }
}