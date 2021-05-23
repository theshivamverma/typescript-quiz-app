/* eslint-disable */

import { Table, Thead, Tbody, Tr, Th, Td, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";

import { useAuth } from "../auth";

export default function UserScoreboard() {
  const { user, setUserData } = useAuth();

  useEffect(() => {
    if (user) {
      setUserData(`${user?._id}`);
    }
  }, [user]);

  return (
    <Flex w="100%" h="90vh" justify="center" align="center" direction="column">
      <Text fontSize="lg" mb="5">
        Scoreboard
      </Text>
      <Table
        size="md"
        w={{ base: "90%", xl: "50%" }}
        borderRadius="xl"
        borderWidth="1px"
      >
        <Thead>
          <Tr>
            <Th>Quizname</Th>
            <Th>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {user?.scoreboard.map((score) => {
            return (
              <Tr>
                <Td>{score.quizname}</Td>
                <Td>{`${score.score}/ ${score.outofscore}`}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
}
