import {
  Flex,
  useColorModeValue,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { loginUser, useAuth } from "../auth";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

export default function Login() {
  const loginBg = useColorModeValue("gray.300", "gray.700");

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  const { login, setLogin, setUserData, setToken } = useAuth();

  const navigate = useNavigate();
  const { state }: any = useLocation();

  login && navigate(state !== null && state?.from ? state.from : "/");

  async function loginClickHandler(username: string, password: string) {
    const { loginStatus, token } = await loginUser(username, password);
    if (loginStatus) {
      setLogin(true);
      setToken(token)
      setUserData();
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Invalid credentials",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex w="100%" h="90vh" justify="center" align="center">
      <Flex
        w={{ base: "90%", xl: "30%" }}
        bg={loginBg}
        direction="column"
        p="4"
        align="center"
        borderRadius="lg"
      >
        <Text fontSize="lg">Login</Text>
        <Input
          placeholder="Username"
          my="3"
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputGroup size="md">
          <Input
            pr="4"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          mt="4"
          w={{ base: "50%", xl: "30%" }}
          onClick={() => loginClickHandler(username, password)}
        >
          Login
        </Button>
        <Link as={RouterLink} to="/signup" mt="4">
          Signup
        </Link>
      </Flex>
    </Flex>
  );
}
