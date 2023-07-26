import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Link,
  Button,
  Box,
  VStack,
  Text,
  Heading,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [loginField, setLoginField] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/kanban/user-list/?username=${loginField}&email=${loginField}`
      );
      const users = response.data;

      const matchingUser = users.find((user) => user.password === password);

      if (matchingUser) {
        setIsSubmitting(false);

        localStorage.setItem("loggedInUserName", matchingUser.username);

        navigate("/home");
      } else {
        setErrorMessage(
          "Invalid login credentials. Please check your username/email and password."
        );
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Login failed!", error);
      setErrorMessage(
        "An error occurred during login. Please try again later."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <Box w="100%" p={4} rounded="md">
      <VStack spacing={4} align="center">
        <Heading as="h1" size="lg" fontWeight="bold">
          Login to Your Account
        </Heading>
        <Divider />
        <form onSubmit={handleLogin}>
          <VStack spacing={4} align="left" w="100%">
            <FormControl id="loginField">
              <FormLabel>Username or Email</FormLabel>
              <Input
                type="text"
                value={loginField}
                onChange={(e) => setLoginField(e.target.value)}
                placeholder="Enter your username or email"
                isRequired
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                isRequired
              />
            </FormControl>
            {errorMessage && (
              <Alert status="error" rounded="md" height="auto">
                <AlertIcon />
                <VStack align="left" spacing={1}>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </VStack>
              </Alert>
            )}
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
              loadingText="Logging in..."
              w="100%"
            >
              Login
            </Button>
            <Text fontSize="sm" color="gray.500">
              Don't have an account?{" "}
              <Link as={RouterLink} to="/register" color="teal.500">
                Register here.
              </Link>
            </Text>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default LoginForm;
