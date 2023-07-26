import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
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

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmailList = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/kanban/user-list/"
        );
        setEmailList(response.data.map((user) => user.email));
      } catch (error) {
        console.error("Error fetching email list:", error);
      }
    };
    fetchEmailList();
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation checks
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      setErrorMessage("Password must be alphanumeric.");
      setIsSubmitting(false);
      return;
    }

    if (password.length < 5) {
      setErrorMessage("Password should have a minimum length of 5 characters.");
      setIsSubmitting(false);
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (emailList.includes(email)) {
      setErrorMessage("Email already exists. Please use a different email.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/kanban/user-create/",
        {
          username: username,
          email: email,
          password: password,
        }
      );

      console.log("Registration successful!", response.data);

      setRegistrationSuccess(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Registration failed!", error);
      setErrorMessage(
        "An error occurred during registration. Please try again later."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <Box w="100%" p={4} rounded="md">
      <VStack spacing={4} align="center">
        <Heading as="h1" size="lg" fontWeight="bold">
          Create an Account
        </Heading>
        <Divider />
        <form onSubmit={handleRegistration}>
          <VStack spacing={4} align="left" w="100%">
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                isRequired
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
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

            {registrationSuccess && (
              <Alert status="success" rounded="md" height="auto">
                <AlertIcon />
                <VStack align="left" spacing={1}>
                  <AlertTitle>Registration Successful!</AlertTitle>
                  <AlertDescription>
                    Your account has been registered successfully. Please login
                    to proceed.
                  </AlertDescription>
                </VStack>
              </Alert>
            )}
            <Button
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
              loadingText="Registering..."
              w="100%"
            >
              Register
            </Button>
            <Text fontSize="sm" color="gray.500">
              Already have an account?{" "}
              <Link as={RouterLink} to="/" color="teal.500">
                Login here.
              </Link>
            </Text>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default RegistrationForm;
