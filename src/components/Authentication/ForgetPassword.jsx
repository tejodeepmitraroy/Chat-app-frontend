import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const forgetHandler = async () => {
    setLoading(true);
    if (!email) {
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

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/forgetPassword`,
        { email },
        config
      );

      toast({
        title: "Reset Link send on Given Email ID successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      setLoading(false);
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
      <Box display="flex" justifyItems="flex-start">
        <Text fontSize="xl" fontWeight="bold">
          Forget Password
        </Text>
      </Box>

      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          placeholder="john.Doe@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <Box
        display="flex"
        width="100%"
        paddingX="1rem"
        justifyContent="space-between"
      >
        <Button
          colorScheme="blue"
          paddingX="1.25rem"
          paddingY="-1.5rem"
          bgGradient="linear(to-r, cyan.500, blue.500)"
          _hover={{ bgGradient: "linear(to-bl, cyan.500, blue.500)" }}
          style={{ marginTop: 15 }}
          onClick={forgetHandler}
          isLoading={loading}
        >
          Forget Password
        </Button>
        <Link to="/login">
          <Button style={{ marginTop: 15 }}>
            Back
          </Button>
        </Link>
      </Box>
    </VStack>
  );
};

export default ForgetPassword;
