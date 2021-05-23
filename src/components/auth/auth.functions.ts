import axios from "axios"

export async function loginUser(username: string, password: string){
    try {
        const { status, data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth`, {
            username,
            password
        })
        if(status === 200){
            localStorage.setItem("tcq_login", "true")
            localStorage.setItem("tcq_userid", data.user._id)
            return { loginStatus: true, userId: data.user._id }
        }else{
            return { loginStatus: false, userId: null }
        }
    } catch (error) {
        console.log(error)
        return { loginStatus: false, userId: null }
    }
}

export async function logoutUser(){
    localStorage.removeItem("tcq_login")
    localStorage.removeItem("tcq_userid")
}