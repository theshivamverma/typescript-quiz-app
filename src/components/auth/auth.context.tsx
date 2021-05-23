import axios from "axios"
import React, { createContext, useContext, useEffect, useState } from "react"
import { AuthContextState, User } from "./auth.types"

const initialState: AuthContextState = {
  login: false,
  user: null,
  setLogin: () => null,
  setUserData: () => null,
  saveScore: () => null,
  setUser: () => null
};

const AuthContext = createContext<AuthContextState>(initialState)

export function AuthProvider({ children }: React.PropsWithChildren<{}>){

    const [login, setLogin] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        if(localStorage.getItem("tcq_login")){
            setLogin(true)
            setUserData(localStorage.getItem("tcq_userid"))
        }
    }, [login])

    async function setUserData(userId: string | null) {
      try {
        const {status, data} = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/user/${userId}`
        );
        if(status === 200){
            setUser(data.user)
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function saveScore(quizname: string, score: number, outofscore: number){
        try {
            const { status, data: savedScoreData } = await axios.post(
              `${process.env.REACT_APP_BACKEND_BASE_URL}/score`,
              {
                scoreData: {
                  quizname,
                  score,
                  outofscore,
                  user: user?._id,
                },
              }
            );
             if (status === 200) {
                const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/${user?._id}/add-new-score`, {
                    scoreId: savedScoreData.savedScore._id
                })
                console.log(data, savedScoreData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <AuthContext.Provider value={{ login, user, setLogin, setUserData, saveScore, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}