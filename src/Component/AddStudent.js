import React, { useState } from "react";
import axios from "axios";
import {  FaPlus } from "react-icons/fa";

const BASE_URL = "http://localhost:8097";

function AddStudent() {
  const [formData, setFormData] = useState({ name: "", email: "", city: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/insert`, formData);
      alert("✅ Student added successfully!");
      setFormData({ name: "", email: "", city: "" });
    } catch (err) {
      alert("❌ Failed to add student");
    }
  };

  return (
    <div
      className="card shadow-lg p-4 mx-auto"
      style={{
        maxWidth: "600px",
        backgroundColor: "#ffffffdd",
        borderRadius: "15px",
        backdropFilter: "blur(10px)",
      }}
    >
      <h4 className="text-center text-primary mb-4 fw-bold">
        ➕ Add New Student
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="city"
            placeholder="City"
            className="form-control"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100 fw-bold">
          <FaPlus className="me-2" /> Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudent;
