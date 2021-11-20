/* eslint-disable */

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextState, User } from "./auth.types";
import { useNavigate } from "react-router-dom";
import {
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from "./auth.functions";

const initialState: AuthContextState = {
  login: false,
  user: null,
  token: null,
  setToken: () => null,
  setLogin: () => null,
  setUserData: () => null,
  saveScore: () => null,
  setUser: () => null,
};

const AuthContext = createContext<AuthContextState>(initialState);

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {

  const { isLoggedIn, token: storedToken } = JSON.parse(
      localStorage?.getItem("qviz_login") ||
        JSON.stringify({ isLoggedIn: false, token: null })
    );

  const [login, setLogin] = useState<boolean>(isLoggedIn);
  const [token, setToken] = useState<string | null>(storedToken)
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  token && setupAuthHeaderForServiceCalls(token);

  useEffect(() => {
    if(login){
      setUserData();
    }
  }, [login]);

  useEffect(() => {
    setupAuthExceptionHandler(navigate);
  }, []);

  async function setUserData() {
    try {
      const { status, data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/user/userdetail`
      );
      if (status === 200) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function saveScore(
    quizname: string,
    score: number,
    outofscore: number
  ) {
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
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/user/add-new-score`,
          {
            scoreId: savedScoreData.savedScore._id,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        token,
        setToken,
        setLogin,
        setUserData,
        saveScore,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
