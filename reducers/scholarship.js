const init = {
    data: null,
    is_fetching: false,
    error: null,
}

export function scholarship(state=init, action) {
    if (typeof state === 'undefined') {
        return {
            data: undefined,
            is_fetching: false,
            error: undefined
        }
    }

    switch (action.type) {
        case 'REQUEST_SCHOLARSHIP':
            return {
                ...state,
                data: undefined,
                is_fetching: true,
            };
        case 'RECEIVE_SCHOLARSHIP':
            return {
                ...state,
                data: action.scholarship,
                is_fetching: false,
            };

            case 'ERROR_SCHOLARSHIP':
                return {
                    ...state,
                    is_fetching: false,
                    error: action.error
            };
        default:
            return state
    }
}
