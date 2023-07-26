import React, { useState, useEffect } from "react";
import {
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";
import axios from "axios";

const TaskForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    task_name: "",
    priority: 3,
    description: "",
    summary: "",
    reporter: "",
    assignee: "",
    acceptance_criteria: "",
    start_date: "",
    due_date: "",
    column: 1,
    issue_type: "",
    story_points: 0,
    status: "Not-Started",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [assignees, setAssignees] = useState([]);
  const [reporters, setReporters] = useState([]);
  useEffect(() => {
    const fetchAssigneesAndReporters = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/kanban/user-list/"
        );
        const assigneesData = response.data;
        setAssignees(assigneesData);
        const reportersData = response.data;
        setReporters(reportersData);
      } catch (error) {
        console.error("Error fetching assignees and reporters:", error);
      }
    };

    fetchAssigneesAndReporters();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/kanban/card-create/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal size={"3xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={4}>
            <form onSubmit={handleSubmit}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <FormControl isRequired mt={4}>
                    <FormLabel>Task Name</FormLabel>
                    <Input
                      type="text"
                      name="task_name"
                      value={formData.task_name}
                      onChange={handleInputChange}
                      placeholder="Task Name"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                    >
                      <option value="1">P1 - Resolve Immediately</option>
                      <option value="2">P2 - Give High Attention</option>
                      <option value="3">P3 - Normal Queue</option>
                      <option value="4">P4 - Low Priority</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Status</FormLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="Not-Started">Not-Started</option>
                      <option value="In-Progress">In-Progress</option>
                      <option value="Completed">Completed</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Issue Type</FormLabel>
                    <Select
                      name="issue_type"
                      value={formData.issue_type}
                      onChange={handleInputChange}
                    >
                      <option value="story">Story</option>
                      <option value="task">Task</option>
                    </Select>
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Summary</FormLabel>
                    <Textarea
                      name="summary"
                      value={formData.summary}
                      onChange={handleInputChange}
                      placeholder="Summary"
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <Box p={4}>
                    <FormControl mt={4}>
                      <FormLabel>Reporter</FormLabel>
                      <Select
                        name="reporter"
                        value={formData.reporter}
                        onChange={handleInputChange}
                      >
                        {reporters.map((reporter) => (
                          <option
                            key={reporter.user_id}
                            value={reporter.user_id}
                          >
                            {reporter.username}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Assignee</FormLabel>
                      <Select
                        name="assignee"
                        value={formData.assignee}
                        onChange={handleInputChange}
                      >
                        {assignees.map((assignee) => (
                          <option
                            key={assignee.user_id}
                            value={assignee.user_id}
                          >
                            {assignee.username}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Acceptance Criteria</FormLabel>
                      <Textarea
                        name="acceptance_criteria"
                        value={formData.acceptance_criteria}
                        onChange={handleInputChange}
                        placeholder="Acceptance Criteria"
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Start Date</FormLabel>
                      <Input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleInputChange}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Due Date</FormLabel>
                      <Input
                        type="date"
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleInputChange}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Story Points</FormLabel>
                      <Input
                        type="number"
                        name="story_points"
                        value={formData.story_points}
                        onChange={handleInputChange}
                        placeholder="Story Points"
                      />
                    </FormControl>
                  </Box>
                </GridItem>
              </Grid>
            </form>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskForm;
