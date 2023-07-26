import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import CardList from "./components/CardList";
import RegistrationForm from "./Authentication/RegistrationForm";
import LoginForm from "./Authentication/LoginForm";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <RegistrationForm />,
    },

    {
      path: "/",
      element: <LoginForm />,
    },

    {
      path: "/home",
      element: (
        <>
          <DashBoard />,
          <CardList />
        </>
      ),
    },
  ]);
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
