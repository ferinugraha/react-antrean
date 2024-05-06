import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { BsEye, BsEyeSlash, BsPersonFillX } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import "../../app/globals.css";

function LoginPage({ authenticateUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!email || !password) {
        setErrorMessage("Email dan password wajib diisi.");
        return;
      }

      if (email.length < 3 || password.length < 3) {
        setErrorMessage(
          "Email dan password harus memiliki minimal 3 karakter."
        );
        return;
      }

      const response = await axios.post("http://localhost:3000/user/signin", {
        email,
        password,
      });

      const { role } = response.data;
      const { token } = response.data;
      localStorage.setItem("token", token);

      authenticateUser(role);
      if (role === "user") {
        navigate("/home-user");
      } else if (role === "doctor") {
        navigate("/home-doctor");
      } else {
        navigate("/home-staff");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data.message || "Terjadi kesalahan saat login."
      );
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    // <div className="container">
    // {/* <div className="row justify-content-center align-items-center vh-100"> */}
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url('/background.medical.jpg.png')`,
        backgroundSize: "cover",
      }}
    >
      <div className="col-md-4">
        <div
          className="card"
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            backgroundColor: "transparent",
            backdropFilter: "blur(30px)",
            borderRadius: "16px",
          }}
        >
          <div
            className="card-body"
            style={{
              padding: "32px",
            }}
          >
            <h1 className="card-title text-center" style={{ fontSize: "32px" }}>
              Login Page
            </h1>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "grey",
                  }}
                  value={email}
                  onChange={handleEmailChange}
                />
                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-2">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "grey",
                    }}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <span
                    className="input-group-text"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "grey",
                    }}
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <BsEye /> : <BsEyeSlash />}
                  </span>
                </div>
              </Form.Group>

              <button
                type="submit"
                className="btn btn-secondary w-100 mt-4"
                style={{ borderRadius: "16px" }}
              >
                Submit
              </button>

              <p className="text-center mt-3">
                Don't have an account?
                <Link to="/register" className="text-decoration-none">
                  <span
                    style={{
                      transition: "all 0.3s ease",
                      color: "#000000",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "grey";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#000000";
                    }}
                  >
                    Register
                  </span>
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default LoginPage;
