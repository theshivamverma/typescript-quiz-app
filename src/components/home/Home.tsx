import { Box, Flex, Text, Button, Link, useColorModeValue } from '@chakra-ui/react'

import { Link as RouterLink } from "react-router-dom"

export default function Home(){

    const jsBoxbg = useColorModeValue("yellow.300", "yellow.500")

    return (
      <Flex
        w="100%"
        h="90vh"
        align="center"
        justify="center"
        direction="column"
      >
        <Text mb="4" fontSize={{ base: "1.2rem", xl: "2rem" }}>
          Welcome to the coder's quiz
        </Text>
        <Box
          bg={jsBoxbg}
          p={4}
          borderWidth="3px"
          borderRadius="lg"
          w={{ base: "250px", xl: "300px" }}
          align="center"
        >
          <Text mb={2} fontSize={{ base: "1rem", xl: "1.2rem" }}>
            JavaScript Quiz
          </Text>
          <Text mb={3}>Difficulty: easy</Text>
          <Link as={RouterLink} to="/quiz">
            <Button>Play Quiz</Button>
          </Link>
        </Box>
      </Flex>
    );
}