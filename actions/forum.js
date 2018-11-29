export function errorForum(error) {
    return {
        type: 'ERROR_FORUM',
        error
    }
}
export function errorForumSearch(error) {
    return {
        type: 'ERROR_FORUM_SEARCH',
        error
    }
}

export function requestForum() {
    return {
        type: 'REQUEST_FORUM'
    }
}

export function receiveForum(forum) {
    return {
        type: 'RECEIVE_FORUM',
        forum
    }
}

export function searchForum() {
    return {
        type: 'SEARCH_FORUM'
    }
}

export function receiveForumResult(result) {
    return {
        type: 'RECEIVE_FORUM_RESULT',
        result
    }
}