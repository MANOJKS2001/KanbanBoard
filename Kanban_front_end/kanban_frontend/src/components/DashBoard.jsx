import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Heading, Button, Grid, GridItem, Box } from "@chakra-ui/react";
import CardList from "./CardList";
import TaskForm from "./TaskForm";
import { useDisclosure } from "@chakra-ui/react";
const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loggedInUserName = localStorage.getItem("loggedInUserName");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("loggedInUserName");

    navigate("/");
  };
  return (
    <>
      <Heading
        width="239px"
        height="44px"
        top="102px"
        left="102px"
        fontFamily=""
        fontStyle="normal"
        fontWeight="400"
        fontSize="36px"
        lineHeight="44px"
        color="#333333"
        position="absolute"
      >
        Kanban Board
      </Heading>
      <Heading
        width="210px"
        height="29px"
        top="146px"
        left="102px"
        fontFamily=""
        fontStyle="normal"
        fontWeight="400"
        fontSize="24px"
        lineHeight="29px"
        color="#333333"
        position="absolute"
      >
        {loggedInUserName}'s tasks
      </Heading>
      <Button
        onClick={onOpen}
        width="79px"
        top="225px"
        left="106px"
        height="30px"
        fontSize="16px"
        position="absolute"
        backgroundColor="blue"
        borderRadius="4px"
        border="1px black"
        color="white"
      >
        Create
      </Button>
      <Button
        onClick={handleLogout}
        width="79px"
        top="225px"
        right="106px"
        height="30px"
        fontSize="16px"
        position="absolute"
        backgroundColor="blue"
        borderRadius="4px"
        border="1px black"
        color="white"
      >
        Logout
      </Button>

      <CardList />

      <TaskForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Dashboard;
