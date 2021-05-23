import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { ShowRules, QuizQuestions } from "../quiz";
import ShowResults from "./ShowResults";

export default function QuizHome() {

  const [showRules, setShowRules] = useState(true);
  const [startQuiz, setStartQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);



  return (
    <Flex w="100%" h="90vh" justify="center" align="center">
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
