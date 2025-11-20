import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <div className="bg-light text-dark">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container">
          <a className="navbar-brand fs-4 fw-bold" href="/">
            Portfolio
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-2"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item mx-2"><a className="nav-link" href="#skills">Skills</a></li>
              <li className="nav-item mx-2"><a className="nav-link" href="#projects">Projects</a></li>
              <li className="nav-item mx-2"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-5 bg-dark text-light text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Vasudev Kumar</h1>
          <p className="lead">Java Full Stack Developer</p>
          <p className="mt-3 w-75 mx-auto">
            I am a passionate and dedicated Java Full Stack Developer specializing in building modern, scalable, and efficient web applications. With strong expertise in Spring Boot, React, and MySQL, I love transforming ideas into powerful digital solutions.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <h2 className="fw-bold mb-4">About Me</h2>
          <p className="fs-5">
            I completed my Java Full Stack Developer course in 2024 from Raja Mahendra Pratap University. I have earned a Full Stack Java Certification from Ducate, where I worked on multiple real-world CRUD-based applications using Spring Boot, React, and MySQL.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold mb-4">Skills</h2>
          <div className="row g-3">
            {["HTML", "CSS", "JavaScript", "React", "Java", "Spring Boot", "MySQL", "Git"].map((skill) => (
              <div key={skill} className="col-md-3">
                <div className="border rounded p-3 text-center bg-white shadow-sm">
                  {skill}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-5">
        <div className="container">
          <h2 className="fw-bold mb-4">Projects</h2>

          <div className="row g-4">
            {[
              {
                title: "Student Management System",
                desc: "CRUD based student management system using Spring Boot, React and MySQL.",
              },
              {
                title: "Employee Management System",
                desc: "Full CRUD employee dashboard with backend API integration.",
              },
              {
                title: "Library Management System",
                desc: "Book issuing, returning and inventory tracking using Java Full Stack.",
              },
            ].map((project) => (
              <div className="col-md-4" key={project.title}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{project.title}</h5>
                    <p className="card-text">{project.desc}</p>
                    <a
                      href="https://github.com/vasudevkum"
                      target="_blank" rel="noreferrer"
                      className="btn btn-dark mt-2"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 bg-dark text-light">
        <div className="container">
          <h2 className="fw-bold mb-4">Contact</h2>
          <p className="fs-5">Email: <a className="text-info" href="mailto:dev879636@gmail.com">dev879636@gmail.com</a></p>
          <p className="fs-5">Phone: +91 7037839411</p>
          <p className="fs-5">Location: Noida</p>
          <p className="fs-5">GitHub: <a className="text-info" href="https://github.com/vasudevkum" target="_blank" rel="noreferrer">github.com/vasudevkum</a></p>
        </div>
      </section>
    </div>
  );
}
