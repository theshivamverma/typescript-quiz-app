import { Box, Button, Flex, useColorMode, useColorModeValue, Circle, Link } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from "react-router-dom"

export default function Navbar(){
    const { colorMode, toggleColorMode } = useColorMode();
    const toogleButtonbg = useColorModeValue("gray.100", "gray.700");
    const navbarbg = useColorModeValue("blue.200", "blue.700");
    return (
      <Flex bg={navbarbg} px={4} py={2} align="center" justify="space-between">
        <Flex w={{ base: "50%", xl: "20%" }} justify="space-between">
          <Link as={RouterLink} to="/">
            Home
          </Link>
        </Flex>
        <Circle
          size="40px"
          bg={toogleButtonbg}
          onClick={() => toggleColorMode()}
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Circle>
      </Flex>
    );
}