import React, { useEffect } from "react";
import { Container, Center, Box, Text } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Center
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">
          Talk-A-Tive
        </Text>
      </Center>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="2px">
        <Login />
      </Box>
    </Container>
  );
};

export default LoginPage;
