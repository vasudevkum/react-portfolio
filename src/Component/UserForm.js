import React, { useState } from "react";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";

const UserForm = ({ refreshUsers }) => {
  const [formData, setFormData] = useState({ id: "", name: "", age: "" });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isUpdating) {
        await axios.put(`http://localhost:8080/User/${formData.id}`, formData);
        alert("User Updated Successfully!");
      } else {
        await axios.post("http://localhost:8080/User", formData);
        alert("User Added Successfully!");
      }

      setFormData({ id: "", name: "", age: "" });
      setIsUpdating(false);
      refreshUsers();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <Card className="shadow p-4 mt-3">
      <Card.Title className="text-center mb-3">
        {isUpdating ? "Update User" : "Add New User"}
      </Card.Title>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter ID"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" className="w-100" variant={isUpdating ? "warning" : "primary"}>
          {isUpdating ? "Update User" : "Add User"}
        </Button>
      </Form>
    </Card>
  );
};

export default UserForm;
