/* eslint-disable */

import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useQuiz } from "../quiz";

export default function QuizQuestions({ setShowResults, setStartQuiz }: any) {
  const { quizState, quizDispatch } = useQuiz();
  const { quizData, quizPoints, quizCategory, getQuizData } = quizState;
  const quizQuestions = quizData.filter(
    (question) => question.category === quizCategory
  );

  const centerDivBg = useColorModeValue("gray.100", "gray.700");
  const nextBtnBg = useColorModeValue("gray.700", "gray.100");
  const nextBtnColor = useColorModeValue("gray.100", "gray.700");
  const hoverBtnBgColor = useColorModeValue("gray.100", "gray.700");
  const optionYellow = useColorModeValue("yellow.300", "yellow.300");
  const optionRed = useColorModeValue("red.200", "red.300");
  const optionGreen = useColorModeValue("green.200", "green.300");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(30);
  const [optionClicked, setOptionClicked] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  useEffect(() => {
    quizDispatch({ type: "RESET_DEFAULTS" });
  }, []);

  useEffect(() => {
    if (timer > 0) {
      let timerInterval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => {
        clearInterval(timerInterval);
      };
    }
    if (timer === 0) {
      nextQuestion();
      quizDispatch({ type: "SKIP_QUESTION" });
    }
  }, [timer]);

  function nextQuestion() {
    if (currentQuestion < 9) {
      setTimer(30);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setStartQuiz(false);
    }
  }

  function checkForAnswer() {
    if (optionClicked === quizQuestions[currentQuestion].correct_answer) {
      setIsAnswerCorrect(true);
      quizDispatch({
        type: "INCREASE_QUIZ_SCORE",
        payload: { point: quizQuestions[currentQuestion].point },
      });
    } else {
      quizDispatch({
        type: "DECREASE_QUIZ_SCORE",
        payload: {
          negativePoint: quizQuestions[currentQuestion].negativePoint,
        },
      });
    }
  }

  useEffect(() => {
    if (optionClicked !== null) {
      checkForAnswer();
    }
  }, [optionClicked]);

  useEffect(() => {
    return () => {
      setIsAnswerCorrect(false);
      setOptionClicked(null);
    };
  }, [currentQuestion]);

  function setOptionColour(option: string | null) {
    if (optionClicked === option) {
      if (isAnswerCorrect) return optionGreen;
      else return optionRed;
    } else {
      if (
        optionClicked !== null &&
        optionClicked !== option &&
        option === quizQuestions[currentQuestion].correct_answer
      )
        return optionGreen;
      else return optionYellow;
    }
  }

  return (
    <Flex
      w={{ base: "100%", xl: "50%" }}
      direction="column"
      bg={centerDivBg}
      p={4}
      borderRadius="lg"
    >
      {quizQuestions.length > 0 ? (
        <>
          <Flex w="100%" justify="space-between">
            <Text>Question: {currentQuestion + 1}</Text>
            <Text>Points: {quizPoints}</Text>
          </Flex>
          <Box
            w="100%"
            h="80%"
            borderWidth="1px"
            mt="4"
            borderRadius="lg"
            p={4}
            borderColor={nextBtnBg}
          >
            <Box>
              <Text>Question: {quizQuestions[currentQuestion].question}</Text>
            </Box>
            {Object.keys(quizQuestions[currentQuestion].options).map(
              (option) => {
                return (
                  quizQuestions[currentQuestion].options[option] !== null && (
                    <Box
                      color="black"
                      key={option}
                      w="100%"
                      p="4"
                      cursor="pointer"
                      my="3"
                      borderRadius="md"
                      bg={`${setOptionColour(option)}`}
                      onClick={() => {
                        setOptionClicked(option);
                        setTimeout(() => {
                          nextQuestion();
                        }, 1000);
                      }}
                    >
                      <Text>
                        {quizQuestions[currentQuestion].options[option] !==
                          null &&
                          quizQuestions[currentQuestion].options[option]}
                      </Text>
                    </Box>
                  )
                );
              }
            )}
          </Box>
          <Flex justifyContent="space-between" mt="3">
            <Text>Time: {timer}</Text>
            <Button
              background={nextBtnBg}
              color={nextBtnColor}
              _hover={{ color: `${hoverBtnBgColor}` }}
              onClick={() => {
                nextQuestion();
                quizDispatch({ type: "SKIP_QUESTION" });
              }}
            >
              {currentQuestion >= 9 ? `Finish` : `Next`}
            </Button>
          </Flex>
        </>
      ) : (
        <Spinner />
      )}
    </Flex>
  );
}
