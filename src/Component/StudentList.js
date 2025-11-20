import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const BASE_URL = "http://localhost:8097";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editStudent, setEditStudent] = useState(null); // selected student for editing
  const [formData, setFormData] = useState({ name: "", email: "", city: "" });

  // Fetch all students
  const fetchStudents = async (pageNo = 0) => {
    try {
      const res = await axios.get(`${BASE_URL}/student?page=${pageNo}&size=5`);
      setStudents(res.data.content);
      setPage(res.data.number);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    if (window.confirm("Delete this student?")) {
      try {
        await axios.delete(`${BASE_URL}/student/${id}`);
        alert("✅ Student deleted successfully!");
        fetchStudents(page);
      } catch (err) {
        alert("❌ Failed to delete");
      }
    }
  };

  // Open edit modal
  const openEditModal = (student) => {
    setEditStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      city: student.city,
    });
  };

  // Handle update submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/student/${editStudent.id}`, formData);
      alert("✅ Student updated successfully!");
      setEditStudent(null);
      fetchStudents(page);
    } catch (err) {
      console.error("Error updating student:", err);
      alert("❌ Failed to update student");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div
      className="card shadow-lg p-4"
      style={{
        backgroundColor: "#ffffffee",
        borderRadius: "15px",
      }}
    >
      <h4 className="text-primary fw-bold mb-3">📋 Student List</h4>
      <table className="table table-hover align-middle text-center">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.city}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => openEditModal(s)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteStudent(s.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-muted">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={page === 0}
          onClick={() => fetchStudents(page - 1)}
        >
          ⬅️ Previous
        </button>
        <span className="fw-bold text-primary">
          Page {page + 1} of {totalPages}
        </span>
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={page + 1 >= totalPages}
          onClick={() => fetchStudents(page + 1)}
        >
          Next ➡️
        </button>
      </div>

      {/* Edit Modal */}
      {editStudent && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            background: "rgba(0,0,0,0.5)",
            zIndex: 1000,
          }}
        >
          <div
            className="card p-4 shadow-lg"
            style={{
              width: "400px",
              borderRadius: "15px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <h5 className="text-center text-primary mb-3">✏️ Edit Student</h5>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="name"
                className="form-control mb-2"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                name="email"
                className="form-control mb-2"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <input
                type="text"
                name="city"
                className="form-control mb-3"
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditStudent(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentList;
