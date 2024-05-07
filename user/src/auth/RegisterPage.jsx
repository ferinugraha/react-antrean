import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../app/globals.css";

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
    // <div className="container">
    //   <div className="row justify-content-center align-items-center vh-100">
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url('/light-blue.jpg')`,
        backgroundSize: "cover",
      }}
    >
      <div className="col-md-5">
        <div
          className="card"
          style={{
            boxShadow: "0 0 10px rgba(0,0,255, 0.3)",
            backgroundColor: "white",
            backdropFilter: "blur(30px)",
            borderRadius: "16px",
          }}
        >
          <div className="card-body">
            <h1 className="card-title text-center" style={{ fontSize: "32px" }}>
              Register
            </h1>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName" className="mb-2">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukan nama anda"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "grey",
                  }}
                  value={name}
                  onChange={handleNameChange}
                  required
                  minLength={3}
                />
                <Form.Control.Feedback type="invalid">
                  Nama harus diisi dan minimal 3 karakter.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className="mb-2">
                <Form.Label>Alamat email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Masukan email"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "grey",
                  }}
                  value={email}
                  onChange={handleEmailChange}
                  required // Input wajib diisi
                  minLength={3} // Minimal 3 karakter
                />
                <Form.Control.Feedback type="invalid">
                  Email harus diisi dan minimal 3 karakter.
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Kami tidak akan pernah membagikan email Anda kepada orang
                  lain.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
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
                    required
                    minLength={3}
                  />
                  <Form.Control.Feedback type="invalid">
                    Password harus diisi dan minimal 3 karakter.
                  </Form.Control.Feedback>
                  <button
                    type="button"
                    className="input-group-text"
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "grey",
                    }}
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <BsEye /> : <BsEyeSlash />}
                  </button>
                </div>
              </Form.Group>

              <button
                type="submit"
                className="btn btn-primary w-100 mt-4"
                style={{ borderRadius: "16px" }}
              >
                Submit
              </button>

              <p className="text-center mt-3">
                <>
                  <span
                    style={{
                      fontWeight: "500",
                      fontSize: "16px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Sudah memiliki akun?{" "}
                  </span>
                  <span style={{ display: "inline-block" }}>
                    <Link
                      to="/"
                      style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        transition: "all 0.3s ease",
                        textDecoration: "underline",
                      }}
                      className="nav-link"
                    >
                      Login
                    </Link>
                  </span>
                </>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
