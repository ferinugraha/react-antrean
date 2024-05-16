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
        <div className="lg:py-4">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-primary">Kuota Pasien </span>
            <span className="text-black">
              {" "}
              Hari Ini ({new Date().toISOString().slice(0, 10)})
            </span>
          </h2>
        </div>

        {showForm ? (
          <article className="hover:animate-background rounded-xl bg-gray-200 p-0.5 shadow-md">
            <div className="rounded-[8px] bg-white p-4 !pt-8 sm:p-20">
              <Form onSubmit={handleSubmit} className="mt-2">
                <Row className="mb-3">
                  <Col md={4} className="mt-2 ">
                    <Form.Group className="mt-2" controlId="formDate">
                      <Form.Label>Tanggal</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Masukkan Tanggal"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mt-2">
                    <Form.Group className="mt-2" controlId="formTransaction">
                      <Form.Label>Transaksi</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Transaksi"
                        name="Transaction"
                        value="Kuota Pasien"
                        onChange={handleChange}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} className="mt-2">
                    <Form.Group className="mt-2" controlId="formQuota">
                      <Form.Label>Kuota</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Masukkan Kuota"
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
            </div>
          </article>
        ) : (
          <div className="overflow-x-auto border rounded-lg">
            {data.map((item) => (
              <div className="bg-white rounded-lg p-4 mb-4" key={item._id}>
                <Row className="mb-3">
                  <Col md={6}>
                    <table className="table table-bordered mb-0">
                      <tbody>
                        <tr>
                          <td className="fw-bold">Tanggal:</td>
                          <td>{item.date}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Transaksi:</td>
                          <td>{item.Transaction}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                  <Col md={6}>
                    <table className="table table-bordered mb-0">
                      <tbody>
                        <tr>
                          <td className="fw-bold">Kuota:</td>
                          <td>{item.Quota}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Tersedia:</td>
                          <td>{item.Available}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Digunakan:</td>
                          <td>{item.Used}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
                <div className="mb-3">
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
                </div>
              </div>
            ))}
          </div>
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
