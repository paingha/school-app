const baseUrl = "https://www.theacademist.com/"
const urls = {
    "login": `${baseUrl}api/v1/user/login`,
    "register": `${baseUrl}api/v1/user/register`,
    "getUser": `${baseUrl}api/v1/user/{user_id}`,
    "forgot": `${baseUrl}api/v1/user/forgot-password`,
    "loginFacebook": `${baseUrl}api/v1/user/facebook-login`,
    "registerFacebook": `${baseUrl}api/v1/user/facebook-register`,
    "loginGoogle": `${baseUrl}api/v1/user/google-login`,
    "registerGoogle": `${baseUrl}api/v1/user/google-register`,
}

module.exports = urls;