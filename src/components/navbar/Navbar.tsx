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
          w={{ base: "45%", xl: "10%" }}
          justify="space-between"
          align="center"
        >
          <Link as={RouterLink} to="/">
            Home
          </Link>
          {login && (
            <Link as={RouterLink} to="/scoreboard">
              Scoreboard
            </Link>
          )}
        </Flex>
        <Flex
          w={{ base: "40%", xl: "10%" }}
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
              <PopoverContent display="flex">
                <PopoverArrow />
                <PopoverCloseButton />
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
              Login
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