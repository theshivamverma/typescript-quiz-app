export type AuthContextState = {
  login: boolean;
  user: User | null;
  token: string | null;
  setToken: (value: string | null) => void;
  setLogin: (value: boolean) => void;
  setUserData: () => void;
  setUser: (user : User | null) => void;
  saveScore: (
    quizname: string,
    score: number,
    outofscore: number
  ) => void;
};

export type User = {
    _id: string,
    username: string,
    scoreboard: Scoreboard[]
}

export type Scoreboard = {
    quizname: string,
    score: number,
    outofscore: number,
    user: string
}