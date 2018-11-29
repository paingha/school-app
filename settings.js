const baseUrl = "https://www.theacademist.com/"
const urls = {
    "login": `${baseUrl}api/v1/user/login`,
    "register": `${baseUrl}api/v1/user/register`,
    "getUser": `${baseUrl}api/v1/user/{user_id}`,
    "updateUser": `${baseUrl}api/v1/user/{user_id}`,
    "forgot": `${baseUrl}api/v1/user/forgot-password`,
    "loginFacebook": `${baseUrl}api/v1/user/facebook-login`,
    "registerFacebook": `${baseUrl}api/v1/user/facebook-register`,
    "loginGoogle": `${baseUrl}api/v1/user/google-login`,
    "registerGoogle": `${baseUrl}api/v1/user/google-register`,
    "getMajors": `${baseUrl}services/get-majors`,
    "getCountries": `${baseUrl}services/get-country`,
    "upload": `${baseUrl}services/aws-signed-url`,
    "scholarship_search": `${baseUrl}api/v1/scholarship/search`,
    "gpa_search": `${baseUrl}api/v1/school/search-by-gpa`,
    "getStates": `${baseUrl}services/get-state`,
    "save_scholarship": `${baseUrl}api/v1/scholarship/save/{user_id}`,
    "unsave_scholarship": `${baseUrl}api/v1/scholarship/unsave/{user_id}`,
    "getBlogs": `${baseUrl}api/v1/blog?offset={off}`,
    "getForums": `${baseUrl}api/v1/forum?offset={off}`,
    "searchForum": `${baseUrl}api/v1/forum/search`
}

module.exports = urls;