/* eslint-disable */

import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ShowRules, QuizQuestions } from "../quiz";
import ShowResults from "./ShowResults";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../quiz";

export default function QuizHome() {
  const [showRules, setShowRules] = useState(true);
  const [startQuiz, setStartQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const { quizState } = useQuiz();

  const { quizCategory } = quizState;

  const navigate = useNavigate();

  useEffect(() => {
    if (quizCategory === "") {
      navigate("/");
    }
  }, []);

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      {showRules && (
        <ShowRules setShowRules={setShowRules} setStartQuiz={setStartQuiz} />
      )}
      {startQuiz && (
        <QuizQuestions
          setShowResults={setShowResults}
          setStartQuiz={setStartQuiz}
        />
      )}
      {showResults && (
        <ShowResults
          setShowResults={setShowResults}
          setShowRules={setShowRules}
        />
      )}
    </Flex>
  );
}
