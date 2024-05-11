import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import axios from "axios";

function ReportPage() {
  const [completedPatients, setCompletedPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchCompletedPatients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pasien/list");
        const data = response.data;

        const completedPatients = data.filter(
          (patient) => patient.status === "Selesai"
        );

        setCompletedPatients(completedPatients);
      } catch (error) {
        console.error("Error fetching completed patients:", error);
      }
    };

    fetchCompletedPatients();
  }, []);

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setSelectedPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  return (
    <div>
      <Container className="mt-2">
        <h4>ReportPage</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Telepon</th>
              <th>Status</th>
              <th>Nama Dokter</th>
              <th>Nama Staff</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {completedPatients.map((patient, index) => (
              <tr key={patient._id}>
                <td>{index + 1}</td>
                <td>{patient.nama}</td>
                <td>{patient.telepon}</td>
                <td>{patient.status}</td>
                <td>{patient.namaDokter}</td>
                <td>{patient.namaStaff}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleViewDetails(patient)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Pasien: {selectedPatient?.nama}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <Form.Group controlId="formNama">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  name="nama"
                  value={selectedPatient?.nama || ""}
                  onChange={handleChangeInput}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mt-2">
              <Form.Group controlId="formUmur">
                <Form.Label>Umur</Form.Label>
                <Form.Control
                  type="text"
                  name="umur"
                  value={selectedPatient?.umur || ""}
                  onChange={handleChangeInput}
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
                  value={selectedPatient?.gender || ""}
                  onChange={handleChangeInput}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mt-2">
              <Form.Group controlId="formTelepon">
                <Form.Label>No Telepon</Form.Label>
                <Form.Control
                  type="text"
                  name="telepon"
                  value={selectedPatient?.telepon || ""}
                  onChange={handleChangeInput}
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
                  value={selectedPatient?.jenisPembayaran || ""}
                  onChange={handleChangeInput}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mt-2">
              <Form.Group controlId="formNamaStaff">
                <Form.Label>Nama Staff</Form.Label>
                <Form.Control
                  type="text"
                  name="namaStaff"
                  value={selectedPatient?.namaStaff || ""}
                  onChange={handleChangeInput}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mt-2">
              <Form.Group controlId="formNamaDokter">
                <Form.Label>Nama Dokter</Form.Label>
                <Form.Control
                  type="text"
                  name="namaDokter"
                  value={selectedPatient?.namaDokter || ""}
                  onChange={handleChangeInput}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="mt-2">
              <Form.Group controlId="formAlamat">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="alamat"
                  value={selectedPatient?.alamat || ""}
                  onChange={handleChangeInput}
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
                  value={selectedPatient?.keluhan || ""}
                  onChange={handleChangeInput}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={12} className="mt-2">
              <Form.Group controlId="formHasilDokter">
                <Form.Label>Hasil Dokter</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="hasilDokter"
                  value={selectedPatient?.hasilDokter || ""}
                  onChange={handleChangeInput}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
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

export default ReportPage;
