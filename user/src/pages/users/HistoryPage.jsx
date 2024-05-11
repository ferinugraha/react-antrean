import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  InputGroup,
  Modal,
  Row,
  Col,
} from "react-bootstrap";

function HistoryPage() {
  const uuiid = localStorage.getItem("uuiid");
  const [historyData, setHistoryData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchHistoryData = async (order) => {
    try {
      const response = await fetch(
        `http://localhost:3000/pasien/cekantrean/${uuiid}?order=${order}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }
      const data = await response.json();
      const sortedData = order === "desc" ? data.reverse() : data;
      setHistoryData(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistoryData("desc");
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <div>
      <Container className="mt-4">
        <h4>HistoryPage</h4>
        <div>
          {historyData.map((item) => (
            <Card
              key={item.id}
              className="mb-2"
              onClick={() => handleItemClick(item)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <h4>{item.nama}</h4>
                  <p>{item.status}</p>
                </div>
                <Card.Text>Tanggal: {item.createdAt.slice(0, 10)}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Penyakit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <div>
              <Row>
                <Col md={12}>
                  <Form.Group controlId="formNama">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama"
                      value={selectedItem?.nama || ""}
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={6} className="mt-2">
                  <Form.Group controlId="formUmur">
                    <Form.Label>Umur</Form.Label>
                    <Form.Control
                      type="text"
                      name="umur"
                      value={selectedItem?.umur || ""}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mt-2">
                  <Form.Group controlId="formJenisKelamin">
                    <Form.Label>Jenis Kelamin</Form.Label>
                    <Form.Control
                      type="text"
                      name="jenisKelamin"
                      value={selectedItem?.gender || ""}
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={6} className="mt-2">
                  <Form.Group controlId="formTelepon">
                    <Form.Label>No Telepon</Form.Label>
                    <Form.Control
                      type="text"
                      name="telepon"
                      value={selectedItem?.telepon || ""}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mt-2">
                  <Form.Group controlId="formJenisPembayaran">
                    <Form.Label>Jenis Pembayaran</Form.Label>
                    <Form.Control
                      type="text"
                      name="jenisPembayaran"
                      value={selectedItem?.jenisPembayaran || ""}
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={12} className="mt-2">
                  <Form.Group controlId="formNamaStaff">
                    <Form.Label>Nama Staff</Form.Label>
                    <Form.Control
                      type="text"
                      name="namaStaff"
                      value={selectedItem?.namaStaff || ""}
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={12} className="mt-2">
                  <Form.Group controlId="formAlamat">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="alamat"
                      value={selectedItem?.alamat || ""}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="mt-2">
                  <Form.Group controlId="formKeluhan">
                    <Form.Label>Keluhan</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="keluhan"
                      value={selectedItem?.keluhan || ""}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HistoryPage;
