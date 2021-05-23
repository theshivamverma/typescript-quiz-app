export type AuthContextState = {
  login: boolean;
  user: User | null;
  setLogin: (value: boolean) => void;
  setUserData: (userId: string) => void;
  setUser: (user : User | null) => void
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