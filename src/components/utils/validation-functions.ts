export function usernameValidator( username: string ){
    if(username.length === 0){
        return "Username required"
    }else return ""
}

export function passwordValidator( password: string ){
    if(password.length === 0){
        return "Password required"
    }else return ""
}