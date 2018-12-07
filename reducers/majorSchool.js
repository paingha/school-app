const init = {
    data: null,
    is_fetching: false,
    error: null,
}

export function majorSchool(state=init, action) {
    if (typeof state === 'undefined') {
        return {
            data: undefined,
            is_fetching: false,
            error: undefined
        }
    }

    switch (action.type) {
        case 'REQUEST_MAJORSCHOOL':
            return {
                ...state,
                data: undefined,
                is_fetching: true,
            };
        case 'RECEIVE_MAJORSCHOOL':
            return {
                ...state,
                data: action.majorSchool,
                is_fetching: false,
            };

            case 'ERROR_MAJORSCHOOL':
                return {
                    ...state,
                    is_fetching: false,
                    error: action.error
            };
        default:
            return state
    }
}
