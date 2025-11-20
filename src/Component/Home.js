import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center py-5">
      <h1 className="fw-bold mb-3">🎓 Welcome to Student Management System</h1>
      <p className="lead">
        Manage students easily — Add, Edit, Delete and View them all in one place.
      </p>
      <Link to="/add" className="btn btn-light mt-3 fw-bold px-4">
        ➕ Add New Student
      </Link>
    </div>
  );
}

export default Home;
