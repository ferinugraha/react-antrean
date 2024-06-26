import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Dropdown,
} from "react-bootstrap";

function PageList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [filter, setFilter] = useState("");

  const handleClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
    setSelectedUser({});
    setPassword("");
  };

  const handleShowAdd = () => setShowAddModal(true);

  const handleShowEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleShowView = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/user/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setSuccessMessage("User deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorMessage("Failed to delete user");
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...selectedUser, password }),
      });
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      setSuccessMessage("User added successfully");
      fetchData();
      handleClose();
    } catch (error) {
      console.error("Error adding user:", error);
      setErrorMessage("Failed to add user");
    }
  };

  const handleEditUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/edit/${selectedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...selectedUser, password }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to edit user");
      }
      setSuccessMessage("User updated successfully");
      fetchData();
      handleClose();
    } catch (error) {
      console.error("Error editing user:", error);
      setErrorMessage("Failed to edit user");
    }
  };

  const fetchData = async () => {
    try {
      let url = "http://localhost:3000/user/list";
      if (filter) {
        url += `?filter=${filter}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <Container className="mt-3">
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <Button variant="primary" className="me-auto" onClick={handleShowAdd}>
          Tambah Pengguna
        </Button>
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
            className="filter-button"
            style={{
              color: "white",
              backgroundColor: "#007bff",
              border: "none",
              width: "100px",
            }}
          >
            Filter
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFilter("sistem")}>
              Sistem
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilter("user")}>
              Pengguna
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {loading && <Alert variant="info">Loading...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage(null)}
          dismissible
        >
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert
          variant="danger"
          onClose={() => setErrorMessage(null)}
          dismissible
        >
          {errorMessage}
        </Alert>
      )}

      {loading && <Alert variant="info">Loading...</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage(null)}
          dismissible
        >
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert
          variant="danger"
          onClose={() => setErrorMessage(null)}
          dismissible
        >
          {errorMessage}
        </Alert>
      )}

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Nama
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Role
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                Tindakan
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? "odd:bg-gray-50" : ""}
              >
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                  {user.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                  {user.role}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                  {filter === "user" ? (
                    <Button
                      variant="primary"
                      onClick={() => handleShowView(user)}
                    >
                      View
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="info"
                        onClick={() => handleShowEdit(user)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Apakah Anda yakin ingin menghapus pengguna ini?"
                            )
                          ) {
                            handleDelete(user._id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <Modal show={showViewModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Pengguna</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-2" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={selectedUser.name || ""}
              disabled
            />
          </Form.Group>
          <Form.Group className="mt-2" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={selectedUser.email || ""}
              disabled
            />
          </Form.Group>
          <Form.Group className="mt-2" controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              value={selectedUser.role || ""}
              disabled
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah pengguna</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama"
                value={selectedUser.name || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukkan email"
                value={selectedUser.email || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={selectedUser.role || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, role: e.target.value })
                }
                required
              >
                <option value="">Select role</option>
                {["admin", "dokter", "staff"].map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Pengguna</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan name"
                value={selectedUser.name || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukkan email"
                value={selectedUser.email || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={selectedUser.role || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, role: e.target.value })
                }
                required
              >
                <option value="">Select role</option>
                {["admin", "dokter", "staff"].map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default PageList;
