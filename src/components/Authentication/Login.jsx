import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
  Box,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        { email, password },
        config
      );

      console.log(data)

      toast({
        title: "Login successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);

      navigate("/");
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
  };


  return (
    <VStack spacing="12px" display="flex" flexDir="column" gap="3px">
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          placeholder="john.Doe@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Box display="flex" w={"100%"} justifyContent="space-between">
        <Button
          colorScheme="blue"
          bgGradient="linear(to-r, cyan.500, blue.500)"
          _hover={{ bgGradient: "linear(to-bl, cyan.500, blue.500)" }}
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Login
        </Button>
        <Box display="flex" justifyContent="space-between" gap="8px">
          <Link to="/signup">
            <Button
              colorScheme="blue"
              bgGradient="linear(to-r, purple.500, pink.500)"
              _hover={{ bgGradient: "linear(to-l, purple.500, pink.500)" }}
              style={{ marginTop: 15 }}
            >
              Sign Up
            </Button>
          </Link>

          <Link to="/forgetpassword">
            <Button
              colorScheme="blue"
              bgGradient="linear(to-br, pink.500, orange.400)"
              _hover={{ bgGradient: "linear(to-bl, purple.500, pink.500)" }}
              style={{ marginTop: 15 }}
             
            >
              Forget Password
            </Button>
          </Link>
        </Box>
      </Box>
    </VStack>
  );
};

export default Login;
