import { combineReducers } from 'redux'
import {user} from './user'
import {country} from './country'
import {major} from './major'
import {usState} from './state'
import {scholarship} from './scholarship'
import {gpaSchool} from './gpaSchool'
import {blog} from './blog'
import {forum} from './forum'

export const rootReducer = combineReducers({
    user,
    country,
    major,
    usState,
    scholarship,
    gpaSchool,
    blog,
    forum
});