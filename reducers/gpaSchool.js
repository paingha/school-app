const init = {
    data: null,
    is_fetching: false,
    error: null,
}

export function gpaSchool(state=init, action) {
    if (typeof state === 'undefined') {
        return {
            data: undefined,
            is_fetching: false,
            error: undefined
        }
    }

    switch (action.type) {
        case 'REQUEST_GPASCHOOL':
            return {
                ...state,
                data: undefined,
                is_fetching: true,
            };
        case 'RECEIVE_GPASCHOOL':
            return {
                ...state,
                data: action.gpaSchool,
                is_fetching: false,
            };

            case 'ERROR_GPASCHOOL':
                return {
                    ...state,
                    is_fetching: false,
                    error: action.error
            };
        default:
            return state
    }
}
