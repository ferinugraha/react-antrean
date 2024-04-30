import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorMessage("");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!email || !password || !name) {
        setErrorMessage("Name, email, dan password wajib diisi.");
      } else if (email.length < 3 || password.length < 3 || name.length < 3) {
        setErrorMessage(
          "Name, email, dan password harus memiliki minimal 3 karakter."
        );
      } else {
        const response = await axios.post(
          "http://localhost:3000/user/register",
          {
            name: name,
            email: email,
            password: password,
          }
        );
        console.log(response.data);
        alert("Registrasi berhasil!");
        Navigate("/");
      }
    } catch (error) {
      console.error(error);
      if (
        error.response.status === 409 &&
        error.response.data.message === "Email already exists"
      ) {
        setErrorMessage("Email sudah digunakan sebelumnya.");
      } else {
        setErrorMessage(
          error.response.data.message || "Terjadi kesalahan saat mendaftar."
        );
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Register Page</h1>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName" className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={handleNameChange}
                    required
                    minLength={3}
                  />
                  <Form.Control.Feedback type="invalid">
                    Name harus diisi dan minimal 3 karakter.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail" className="mb-2">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                    required // Input wajib diisi
                    minLength={3} // Minimal 3 karakter
                  />
                  <Form.Control.Feedback type="invalid">
                    Email harus diisi dan minimal 3 karakter.
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      minLength={3}
                    />
                    <Form.Control.Feedback type="invalid">
                      Password harus diisi dan minimal 3 karakter.
                    </Form.Control.Feedback>
                    <button
                      type="button"
                      className="input-group-text"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? <BsEye /> : <BsEyeSlash />}
                    </button>
                  </div>
                </Form.Group>

                <button type="submit" className="btn btn-primary w-100 mt-4">
                  Submit
                </button>

                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <Link to="/" className="text-decoration-none">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
