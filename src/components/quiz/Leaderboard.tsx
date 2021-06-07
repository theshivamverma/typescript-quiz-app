/* eslint-disable */

import { Table, Thead, Tbody, Tr, Th, Td, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useAuth } from "../auth";

import axios from "axios";
import { LeaderboardScore } from "./quiz.types";

export default function Leaderboard() {
  const { user, setUserData } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardScore[]>();

  useEffect(() => {
    if (user) {
      setUserData();
      getAllScores();
    }
  }, []);

  async function getAllScores() {
    try {
      const { status, data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/score`
      );
      if (status === 200) {
        console.log(data.scoresData);
        setLeaderboardData(data.scoresData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex w="100%" h="90vh" justify="" align="center" direction="column">
      <Text fontSize="lg" mb="5">
        Leaderboard
      </Text>
      {leaderboardData && leaderboardData.length > 0 ? (
        <Table
          size="md"
          w={{ base: "90%", xl: "50%" }}
          borderRadius="xl"
          borderWidth="1px"
          mb="4"
        >
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Quizname</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboardData
              .sort((score_a, score_b) => score_b.score - score_a.score)
              .slice(0, 15)
              .map((score, index) => {
                return (
                  <Tr key={index}>
                    <Td>{score.user.username}</Td>
                    <Td>{score.quizname}</Td>
                    <Td>{`${score.score}/ ${score.outofscore}`}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      ) : (
        <Text fontSize="2xl">No games played</Text>
      )}
    </Flex>
  );
}
