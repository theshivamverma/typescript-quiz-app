import { Flex, Text, Box, useColorModeValue, Button } from "@chakra-ui/react"

import { useQuiz } from "../quiz"

export default function ShowResults({ setShowResults, setShowRules } : any){
    const centerDivBg = useColorModeValue("gray.100", "gray.700");
    const resultYellow = useColorModeValue("yellow.300", "yellow.300");
    const resultRed = useColorModeValue("red.200", "red.300");
    const resultGreen = useColorModeValue("green.200", "green.300");
    const resultBlue = useColorModeValue("blue.200", "blue.200");

    const { quizState } = useQuiz()

    const { analytics, quizPoints } = quizState

    return (
      <Flex w="40%" direction="column" bg={centerDivBg} p={4} borderRadius="lg">
        <Text textAlign="center" fontSize="xl" >Results</Text>
        <Flex w="100%" p={4} justify="space-between" bg={resultGreen} my={2} color="black" borderRadius="lg">
            <Text>Correct Answers: </Text>
            <Text>{analytics.correct}</Text>
        </Flex>
        <Flex w="100%" p={4} justify="space-between" bg={resultRed} my={2} color="black" borderRadius="lg">
            <Text>Wrong Answers: </Text>
            <Text>{analytics.wrong}</Text>
        </Flex>
        <Flex w="100%" p={4} justify="space-between" bg={resultYellow} my={2} color="black" borderRadius="lg">
            <Text>Not Attempted: </Text>
            <Text>{analytics.unattempted}</Text>
        </Flex>
        <Flex w="100%" p={4} justify="space-between" bg={resultBlue} my={2} color="black" borderRadius="lg">
            <Text>Score: </Text>
            <Text>{`${quizPoints}/30`}</Text>
        </Flex>
        <Flex w="100%" justify="center" my={3}>
            <Button onClick={() => {
                setShowResults(false)
                setShowRules(true)
            }}>Play Again</Button>
        </Flex>
      </Flex>
    );
}