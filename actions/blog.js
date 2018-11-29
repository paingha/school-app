export function errorBlog(error) {
    return {
        type: 'ERROR_BLOG',
        error
    }
}

export function requestBlog() {
    return {
        type: 'REQUEST_BLOG'
    }
}

export function receiveBlog(blog) {
    return {
        type: 'RECEIVE_BLOG',
        blog
    }
}