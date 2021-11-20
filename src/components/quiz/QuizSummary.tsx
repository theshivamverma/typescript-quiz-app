/* eslint-disable */

import { Box, Flex, Text, Button, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useQuiz } from "../quiz";
import { QuizQuestion } from "./quiz.types";

function QuizSummary() {
  const centerDivBg = useColorModeValue("gray.100", "gray.700");
  const nextBtnBg = useColorModeValue("gray.700", "gray.100");
  const optionYellow = useColorModeValue("yellow.300", "yellow.300");
  const optionRed = useColorModeValue("red.200", "red.300");
  const optionGreen = useColorModeValue("green.200", "green.300");

  const { quizState } = useQuiz();
  const { quizData, quizCategory, userAnswers } = quizState;
  const [quizQuestionsArray, setQuizQuestionsArray] =
    useState<QuizQuestion[] | null>(null);

  useEffect(() => {
    quizQuestionsArray === null &&
      setQuizQuestionsArray(
        quizData.filter((question) => question.category === quizCategory)
      );
  }, [quizData, quizQuestionsArray]);

  function setOptionColour(
    correctAnswer: string,
    option: string,
    index: number
  ) {
    if (option === correctAnswer) {
      return optionGreen;
    } else {
      if (
        userAnswers[index] !== "skipped" &&
        userAnswers[index] === option &&
        userAnswers[index] !== correctAnswer
      ) {
        return optionRed;
      } else {
        return optionYellow;
      }
    }
  }

  return (
    <Flex
      w={{ base: "100%", xl: "50%" }}
      direction="column"
      bg={centerDivBg}
      p={4}
      borderRadius="lg"
      mt="10"
      mb="10"
    >
      {quizQuestionsArray?.map((question, index) => {
        return (
          <>
            <Box
            key={index}
              w="100%"
              h="80%"
              borderWidth="1px"
              mt="4"
              borderRadius="lg"
              p={4}
              borderColor={nextBtnBg}
            >
              <Box>
                <Text>Question: {question.question}</Text>
              </Box>
              {Object.keys(question.options).map((option) => {
                return (
                  question.options[option] !== null && (
                    <Box
                      color="black"
                      key={option}
                      w="100%"
                      p="4"
                      cursor="pointer"
                      my="3"
                      borderRadius="md"
                      bg={`${setOptionColour(
                        question.correct_answer,
                        option,
                        index
                      )}`}
                    >
                      <Text>
                        {question.options[option] !== null &&
                          question.options[option]}
                      </Text>
                    </Box>
                  )
                );
              })}
              <Text>
                Result:{" "}
                {userAnswers[index] === "skipped"
                  ? "Skipped"
                  : userAnswers[index] === question.correct_answer
                  ? "Correct"
                  : "Wrong"}
              </Text>
            </Box>
          </>
        );
      })}
    </Flex>
  );
}

export default QuizSummary;
