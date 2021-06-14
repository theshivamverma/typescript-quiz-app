import {
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
  Circle,
  Link,
  WrapItem,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from "react-router-dom"
import { useAuth, logoutUser } from "../auth"

export default function Navbar(){
    const { colorMode, toggleColorMode } = useColorMode();
    const toogleButtonbg = useColorModeValue("gray.100", "gray.700");
    const navbarbg = useColorModeValue("blue.200", "blue.700");

    const { login, user, setUser, setLogin } = useAuth()

    return (
      <Flex bg={navbarbg} px={4} py={2} align="center" justify="space-between">
        <Flex
          w={{ base: "60%", xl: "20%" }}
          justify="space-between"
          align="center"
        >
          <Link fontSize={{ base: "xs", xl: "md" }} as={RouterLink} to="/">
            Home
          </Link>
          {login && (
            <Link
              fontSize={{ base: "xs", xl: "md" }}
              as={RouterLink}
              to="/scoreboard"
            >
              Scoreboard
            </Link>
          )}
          {login && (
            <Link
              fontSize={{ base: "xs", xl: "md" }}
              as={RouterLink}
              to="/leaderboard"
            >
              Leaderboard
            </Link>
          )}
        </Flex>
        <Flex
          w={{ base: "30%", xl: "25%" }}
          justify="space-between"
          align="center"
        >
          {login ? (
            <Popover>
              <PopoverTrigger>
                <WrapItem>
                  <Avatar size="sm" name={user?.username} src="" />
                </WrapItem>
              </PopoverTrigger>
              <PopoverContent display="flex" w="150px">
                <PopoverArrow />
                <PopoverCloseButton mt="3" />
                <PopoverBody>
                  <Button
                    onClick={() => {
                      logoutUser();
                      setUser(null);
                      setLogin(false);
                    }}
                  >
                    Logout
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
            <Link as={RouterLink} to="/login">
              Login/Signup
            </Link>
          )}
          <Circle
            size="35px"
            bg={toogleButtonbg}
            onClick={() => toggleColorMode()}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Circle>
        </Flex>
      </Flex>
    );
}