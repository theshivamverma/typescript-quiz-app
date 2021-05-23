import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom"

import "./index.css";
import App from "./App";
import { QuizProvider } from "../src/components/quiz"
import { AuthProvider } from "../src/components/auth"

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <QuizProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </QuizProvider>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
