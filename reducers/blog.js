const init = {
    data: null,
    is_fetching: false,
    error: null,
}

export function blog(state=init, action) {
    if (typeof state === 'undefined') {
        return {
            data: undefined,
            is_fetching: false,
            error: undefined
        }
    }

    switch (action.type) {
        case 'REQUEST_BLOG':
            return {
                ...state,
                data: undefined,
                is_fetching: true,
            };
        case 'RECEIVE_BLOG':
            return {
                ...state,
                data: action.blog,
                is_fetching: false,
            };

            case 'ERROR_BLOG':
                return {
                    ...state,
                    is_fetching: false,
                    error: action.error
            };
        default:
            return state
    }
}
