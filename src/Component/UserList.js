import React, { useEffect, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Table, Button, Card } from "react-bootstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8097/ReadUser");
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`http://localhost:8084/User/${id}`);
      alert("User deleted successfully!");
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Card className="shadow p-4 mt-4">
      <Card.Title className="text-center mb-3">User List</Card.Title>

      <Table striped bordered hover responsive className="text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.age}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => deleteUser(u.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-muted">
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );
};

export default UserList;
