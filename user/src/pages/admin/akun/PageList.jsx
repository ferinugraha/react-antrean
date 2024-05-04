import React, { useState } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";

const tableData = [
  { id: 1, name: "John Doe 1", email: "john.doe1@example.com", role: "Admin" },
  { id: 2, name: "Jane Doe 2", email: "jane.doe2@example.com", role: "User" },
  { id: 3, name: "Alice 1", email: "alice1@example.com", role: "Dokter" },
  { id: 4, name: "Alice 2", email: "alice2@example.com", role: "Staff" },
];

const TableRow = ({ index, name, email, role, handleShowEdit }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        <Button variant="info" onClick={handleShowEdit}>
          Edit
        </Button>
      </td>
    </tr>
  );
};

function PageList() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [users, setUsers] = useState(tableData);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleShowEdit = (id) => {
    const user = users.find((user) => user.id === id);
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSave = () => {
    handleClose();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.role === "Admin" || user.role === "Staff" || user.role === "Dokter"
  );

  return (
    <Container className="mt-3">
      <div className="d-flex justify-content-between mb-3">
        <h4>List User</h4>
        <div className="d-flex align-items-center">
          <Button variant="primary" onClick={handleShow}>
            Add User
          </Button>
        </div>
      </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <TableRow
              key={user.id}
              index={index}
              {...user}
              handleShowEdit={() => handleShowEdit(user.id)}
            />
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedUser.id ? "Edit User" : "Add User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={selectedUser.name || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={selectedUser.email || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
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
              >
                <option value="">Select role</option>
                {["Admin", "Dokter", "Staff"].map((role) => (
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
                placeholder="Enter password"
                value={selectedUser.password || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, password: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default PageList;
