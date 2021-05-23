/* eslint-disable */

import { Flex, Text, useColorModeValue, Button, Link } from "@chakra-ui/react";
import { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import { useQuiz } from "../quiz";
import { useAuth } from "../auth";

export default function ShowResults({ setShowResults, setShowRules }: any) {
  const centerDivBg = useColorModeValue("gray.100", "gray.700");
  const resultYellow = useColorModeValue("yellow.300", "yellow.300");
  const resultRed = useColorModeValue("red.200", "red.300");
  const resultGreen = useColorModeValue("green.200", "green.300");
  const resultBlue = useColorModeValue("blue.200", "blue.200");

  const { quizState } = useQuiz();

  const { analytics, quizPoints, quizCategory } = quizState;
  const { saveScore } = useAuth();

  useEffect(() => {
    saveScore(quizCategory, quizPoints, 30);
  }, []);

  return (
    <Flex
      w={{ base: "100%", xl: "40%" }}
      direction="column"
      bg={centerDivBg}
      p={4}
      borderRadius="lg"
    >
      <Text textAlign="center" fontSize="xl">
        Results
      </Text>
      <Flex
        w="100%"
        p={4}
        justify="space-between"
        bg={resultGreen}
        my={2}
        color="black"
        borderRadius="lg"
      >
        <Text>Correct Answers: </Text>
        <Text>{analytics.correct}</Text>
      </Flex>
      <Flex
        w="100%"
        p={4}
        justify="space-between"
        bg={resultRed}
        my={2}
        color="black"
        borderRadius="lg"
      >
        <Text>Wrong Answers: </Text>
        <Text>{analytics.wrong}</Text>
      </Flex>
      <Flex
        w="100%"
        p={4}
        justify="space-between"
        bg={resultYellow}
        my={2}
        color="black"
        borderRadius="lg"
      >
        <Text>Not Attempted: </Text>
        <Text>{analytics.unattempted}</Text>
      </Flex>
      <Flex
        w="100%"
        p={4}
        justify="space-between"
        bg={resultBlue}
        my={2}
        color="black"
        borderRadius="lg"
      >
        <Text>Score: </Text>
        <Text>{`${quizPoints}/30`}</Text>
      </Flex>
      <Flex w="100%" justify="space-between" align="center" my={3}>
        <Link as={RouterLink} to="/scoreboard">
          View Scoreboard
        </Link>
        <Button
          onClick={() => {
            setShowResults(false);
            setShowRules(true);
          }}
        >
          Play Again
        </Button>
      </Flex>
    </Flex>
  );
}
