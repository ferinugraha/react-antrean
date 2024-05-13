import React, { useState } from "react";
import { Form, Alert, Image, Col } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../app/globals.css";

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

      const { code_user } = response.data;
      const { token } = response.data;
      const req = await axios.get(
        `http://localhost:3000/user/cekuuid/${code_user}`
      );

      // console.log(code_user);
      // console.log(req.data.name);
      localStorage.setItem("token", token);
      localStorage.setItem("uuiid", code_user);
      localStorage.setItem("name", req.data.name);

      authenticateUser(req.data.role);
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
        backgroundImage: `url('/light-blue.jpg')`,
        backgroundSize: "cover",
      }}
    >
      <>
        <Col className="d-flex justify-content-center">
          <div className="col-md-4">
            <div
              className="card"
              style={{
                boxShadow: "0 0 10px rgba(0,0,255, 0.3)",
                backgroundColor: "white",
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
                <h1
                  className="card-title text-center d-flex justify-content-center"
                  style={{ fontSize: "32px", alignItems: "center" }}
                >
                  <Image
                    src="/logodemo.png" // Ganti dengan path logo Anda
                    style={{
                      height: "80px",
                      width: "80px",
                      marginRight: "10px",
                    }} // Sesuaikan ukuran dan posisi logo sesuai kebutuhan Anda
                  />
                </h1>
                <h1
                  className="card-title text-center justify-content-center"
                  style={{ fontSize: "32px", alignItems: "center" }}
                >
                  Logoipsum
                </h1>

                <h2
                  className="card-title text-center justify-content-center"
                  style={{ fontSize: "16px", alignItems: "center" }}
                >
                  Aplikasi Antrean Rumah Sakit
                </h2>

                <div className="mt-4">
                  <h1
                    className="card-title text-center justify-content-center"
                    style={{ fontSize: "24px", alignItems: "center" }}
                  >
                    Silahkan Login
                  </h1>
                </div>

                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
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
                        Belum punya akun?{" "}
                      </span>
                      <span style={{ display: "inline-block" }}>
                        <Link
                          to="/register"
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            transition: "all 0.3s ease",
                            textDecoration: "underline",
                          }}
                          className="nav-link"
                        >
                          Register
                        </Link>
                      </span>
                    </>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </>
    </div>
  );
}

export default LoginPage;
