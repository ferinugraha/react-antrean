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
  const [data, setData] = useState([
    {
      _id: "1",
      date: "2024-05-12",
      Transaction: "Kuota Pasien",
      Quota: 100,
      Available: 80,
      Used: 20,
    },
    {
      _id: "2",
      date: "2024-05-13",
      Transaction: "Kuota Pasien",
      Quota: 150,
      Available: 100,
      Used: 50,
    },
  ]);
  const [showForm, setShowForm] = useState(true);
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
    // fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newData = {
      ...formData,
      _id: Math.random().toString(),
      Available: 0,
      Used: 0,
    };

    setData((prevData) => [...prevData, newData]);
    setShowForm(false);
  };

  const handleEditModalOpen = (id) => {
    const selectedData = data.find((item) => item._id === id);
    setEditFormData({
      id: selectedData._id,
      date: selectedData.date,
      Transaction: selectedData.Transaction,
      Quota: selectedData.Quota.toString(),
      Available: selectedData.Available.toString(),
      Used: selectedData.Used.toString(),
    });
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    const updatedData = data.map((item) =>
      item._id === editFormData.id ? { ...editFormData } : item
    );

    setData(updatedData);
    handleEditModalClose();
  };

  const handleDelete = (id) => {
    const filteredData = data.filter((item) => item._id !== id);
    setData(filteredData);
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
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Tanggal
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Transaksi
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Kuota
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Tersedia
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Digunakan
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item._id}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {item.date}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {item.Transaction}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {item.Quota}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {item.Available}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {item.Used}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
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
            </table>
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
