import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

import { Link as RouterLink } from "react-router-dom";

import { useQuiz } from "../quiz";

export default function Home() {
  const { quizDispatch } = useQuiz();

  const quizType = [
    { name: "Gangs of Wasseypur", difficulty: "easy" },
    { name: "Sacred Games", difficulty: "easy" },
  ];

  const jsBoxbg1 = useColorModeValue("twitter.300", "");

  return (
    <Flex w="100%" h="90vh" align="center" justify="center" direction="column">
      <Text mb="4" fontSize={{ base: "1.2rem", xl: "2rem" }}>
        Welcome to the Bollywood trivia
      </Text>
      <Flex
        w="100%"
        direction={{ base: "column", xl: "row" }}
        justify={{ base: "center", xl: "space-around" }}
        align={{ base: "center" }}
      >
        {
          quizType.map(({ name, difficulty }, index) => {
            return (
              <Box
                key={index}
                bg={jsBoxbg1}
                p={4}
                borderWidth="3px"
                borderRadius="lg"
                w={{ base: "250px", xl: "300px" }}
                align="center"
                mb={{ base: "4" }}
              >
                <Text mb={2} fontSize={{ base: "1rem", xl: "1.2rem" }}>
                  {`${name} Quiz`}
                </Text>
                <Text mb={3}>Difficulty: {difficulty}</Text>
                <Link as={RouterLink} to={`/play-quiz`}>
                  <Button
                    onClick={() =>
                      quizDispatch({
                        type: "SET_QUIZ_CATEGORY",
                        payload: { category: name },
                      })
                    }
                  >
                    Play Quiz
                  </Button>
                </Link>
              </Box>
            );
          })
        }
      </Flex>
    </Flex>
  );
}
