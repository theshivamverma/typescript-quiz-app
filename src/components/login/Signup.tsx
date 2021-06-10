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
import { signup, checkUsername, useAuth } from "../auth";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import { usernameValidator, passwordValidator } from "../utils/validation-functions"

export default function Signup() {
  const loginBg = useColorModeValue("gray.300", "gray.700");

  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameValid, setUsernameValid] = useState<boolean | undefined>();
  const [usernameMessage, setUsernameMessage] = useState("")
  const [passwordMessage, setpasswordMessage] = useState("")

  const toast = useToast();
  const { login, setLogin, setUserData, setToken } = useAuth();

  const navigate = useNavigate();
  const { state }: any = useLocation();

  login && navigate(state !== null && state?.from ? state.from : "/");

  const handleShowClick = () => setShow(!show);

  async function signupClickHandler(username: string, password: string) {
    if(usernameValid && usernameMessage === "" && passwordMessage === ""){
      const { signupStatus, token } = await signup(username, password);
      if (signupStatus) {
        setLogin(true);
        setToken(token);
        setUserData();
        toast({
          title: "Signup Successfull",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error Signing up",
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      }
    }else{
       toast({
         title: "Enter proper details",
         status: "error",
         duration: 1000,
         isClosable: true,
       });
    }
  }

  async function checkUsernameHandler(username: string) {
    const { isValid } = await checkUsername(username);
    if (isValid) {
      setUsernameValid(true);
    } else {
      setUsernameValid(false);
    }
  }

  return (
    <Flex w="100%" h="90vh" justify="center" align="center">
      <Flex
        w={{ base: "90%", xl: "30%" }}
        bg={loginBg}
        direction="column"
        p="4"
        borderRadius="lg"
      >
        <Text fontSize="lg" textAlign="center">
          Signup
        </Text>
        <Input
          isInvalid={usernameValid === undefined ? false : !usernameValid}
          errorBorderColor="crimson"
          placeholder="Username"
          my="3"
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => {
            checkUsernameHandler(username);
            setUsernameMessage(usernameValidator(username))
          }}
        />
        <Text textAlign="left" color="crimson">
          {usernameValid !== undefined &&
            usernameValid === false &&
            "Username exists"}
        </Text>
        <Text textAlign="left" color="crimson">{usernameMessage}</Text>
        <InputGroup size="md" mt="3">
          <Input
            pr="4"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setpasswordMessage(passwordValidator(password))}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Text textAlign="left" color="crimson">{passwordMessage}</Text>
        <Flex w="100%" direction="column" align="center">
          <Button
            mt="4"
            w={{ base: "50%", xl: "30%" }}
            onClick={() => signupClickHandler(username, password)}
          >
            Signup
          </Button>
          <Link mt="4" as={RouterLink} to="/login">
            Login
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
