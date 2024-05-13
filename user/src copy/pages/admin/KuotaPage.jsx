import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Form,
  Button,
  Row,
  Col,
  Modal,
} from "react-bootstrap";

function KuotaPage() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    Transaction: "Kuota Pasien",
    Quota: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "",
    date: "",
    Transaction: "",
    Quota: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3000/kuota/getkuota")
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setShowForm(true);
        } else {
          setData(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestBody = JSON.stringify(formData);

    fetch("http://localhost:3000/kuota/createkuota", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data berhasil disimpan:", data);
        setShowForm(false);
        fetchData();
      })
      .catch((error) => console.error("Error saving data:", error));
  };

  const handleEditModalOpen = (id) => {
    const selectedData = data.find((item) => item._id === id);
    setEditFormData({
      id: selectedData._id,
      date: selectedData.date,
      Transaction: selectedData.Transaction,
      Quota: selectedData.Quota,
      Available: selectedData.Available,
      Used: selectedData.Used,
    });
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    const { id, ...rest } = editFormData;
    const requestBody = JSON.stringify(rest);

    fetch(`http://localhost:3000/kuota/updatekuota/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data berhasil diubah:", data);
        handleEditModalClose();
        fetchData();
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/kuota/deletekuota/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data berhasil dihapus:", data);
        fetchData();
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <div>
      <Container className="mt-2">
        <h4 className="mt-3">
          Kuota Pasien Hari Ini ({new Date().toISOString().slice(0, 10)})
        </h4>
        {showForm ? (
          <Form onSubmit={handleSubmit} className="mt-3">
            <Row className="mb-3">
              <Col md={12} className="mt-2">
                <Form.Group className="mt-2" controlId="formDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Masukkan Date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="mt-2">
                <Form.Group className="mt-2" controlId="formTransaction">
                  <Form.Label>Transaction</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Transaction"
                    name="Transaction"
                    value="Kuota Pasien"
                    onChange={handleChange}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={12} className="mt-2">
                <Form.Group className="mt-2" controlId="formQuota">
                  <Form.Label>Kuota</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Masukkan Quota"
                    name="Quota"
                    value={formData.Quota}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        ) : (
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Transaksi</th>
                <th>Kuota</th>
                <th>Tersedia</th>
                <th>Digunakan</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.date}</td>
                  <td>{item.Transaction}</td>
                  <td>{item.Quota}</td>
                  <td>{item.Available}</td>
                  <td>{item.Used}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => handleEditModalOpen(item._id)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => {
                        const shouldDelete = window.confirm(
                          "Apakah Anda yakin ingin menghapus item ini?"
                        );
                        if (shouldDelete) {
                          handleDelete(item._id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mt-2" controlId="formEditDate">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editFormData.date}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, date: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="formEditTransaction">
              <Form.Label>Transaksi</Form.Label>
              <Form.Control
                type="text"
                name="Transaction"
                value={editFormData.Transaction}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    Transaction: e.target.value,
                  })
                }
                disabled
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="formEditQuota">
              <Form.Label>Kuota</Form.Label>
              <Form.Control
                type="number"
                name="Quota"
                value={editFormData.Quota}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, Quota: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="formEditAvailable">
              <Form.Label>Tersedia</Form.Label>
              <Form.Control
                type="number"
                name="Available"
                value={editFormData.Available}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    Available: e.target.value,
                  })
                }
                disabled
              />
            </Form.Group>
            <Form.Group className="mt-2" controlId="formEditUsed">
              <Form.Label>Digunakan</Form.Label>
              <Form.Control
                type="number"
                name="Used"
                value={editFormData.Used}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, Used: e.target.value })
                }
                disabled
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default KuotaPage;
