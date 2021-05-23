import { Flex, useColorModeValue, Text, Button } from "@chakra-ui/react";

export default function ShowRules({ setShowRules, setStartQuiz } : any) {

    const centerDivBg = useColorModeValue("gray.100", "gray.700");
    const rulesBtnBg = useColorModeValue("gray.700", "gray.100");
    const rulesBtnColor = useColorModeValue("gray.100", "gray.700");
    const hoverBtnBgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex
      w={{ base: "90%", xl: "50%" }}
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
      <Text fontSize={{ base: "sm", xl: "md" }} textAlign="center" mb={2}>
        {" "}
        1) This quiz contains 10 questions
      </Text>
      <Text fontSize={{ base: "sm", xl: "md" }} textAlign="center" mb={2}>
        {" "}
        2) Each correct answer will get you 3 points.
      </Text>
      <Text fontSize={{ base: "sm", xl: "md" }} textAlign="center" mb={2}>
        {" "}
        3) Each wrong answer will have 1 negative point.
      </Text>
      <Text fontSize={{ base: "sm", xl: "md" }} textAlign="center" mb={2}>
        {" "}
        4) There will be time limit of 30 seconds for each question.
      </Text>
      <Text fontSize={{ base: "sm", xl: "md" }} textAlign="center" mb={2}>
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
          setStartQuiz(true);
          setShowRules(false);
        }}
      >
        Start Quiz
      </Button>
    </Flex>
  );
}
