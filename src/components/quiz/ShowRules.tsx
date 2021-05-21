import { Flex, useColorModeValue, Text, Box, Button } from "@chakra-ui/react";

export default function ShowRules({ setShowRules, setStartQuiz } : any) {

    const centerDivBg = useColorModeValue("gray.100", "gray.700");
    const rulesBtnBg = useColorModeValue("gray.700", "gray.100");
    const rulesBtnColor = useColorModeValue("gray.100", "gray.700");
    const hoverBtnBgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex
      w="50%"
      h="50%"
      bg={centerDivBg}
      borderRadius="xl"
      p={4}
      direction="column"
      justify="center"
      align="center"
    >
      <Text fontSize="xl" textAlign="center">
        Rules
      </Text>
      <br />
      <Text fontSize="md" textAlign="center" mb={2}>
        {" "}
        1) This quiz contains 10 questions
      </Text>
      <Text fontSize="md" textAlign="center" mb={2}>
        {" "}
        2) Each coorect answer will get you 3 points.
      </Text>
      <Text fontSize="md" textAlign="center" mb={2}>
        {" "}
        3) Each wrong answer will have 1 negative point.
      </Text>
      <Text fontSize="md" textAlign="center" mb={2}>
        {" "}
        4) There will be time limit of 30 seconds for each question.
      </Text>
      <Text fontSize="md" textAlign="center" mb={2}>
        All the Best !!
      </Text>
      <Button
        background={rulesBtnBg}
        color={rulesBtnColor}
        mx="auto"
        w="50%"
        m={[3]}
        _hover={{ color: `${hoverBtnBgColor}` }}
        onClick={() => {
            setStartQuiz(true)
            setShowRules(false)
        }}
      >
        Start Quiz
      </Button>
    </Flex>
  );
}
