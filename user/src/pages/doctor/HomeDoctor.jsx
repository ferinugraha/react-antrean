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
import axios from "axios";

function HomeDoctor({ loggedInUser }) {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [message, setMessage] = useState("");
  const [namaDokter, setNamaDokter] = useState(
    loggedInUser ? loggedInUser.username : ""
  );
  const [hasilDokter, setHasilDokter] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pasien/list");
        const data = response.data;

        const filteredPatients = data.filter(
          (patient) => patient.status === "Diproses"
        );

        setPatients(filteredPatients);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      console.log("Reloading data...");
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (patients.length > 0) {
      setSelectedPatient(patients[0]);
    }
  }, [patients]);

  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3000/pasien/update/${selectedPatient._id}`,
        {
          status: "Selesai",
          namaDokter: namaDokter,
          hasilDokter: hasilDokter,
        }
      );
      console.log("Mengirim pesan dan data dokter:", namaDokter, hasilDokter);
      alert("Pesan berhasil dikirim");

      // Mengupdate state lokal patients setelah pesan berhasil dikirim
      const updatedPatients = patients.filter(
        (patient) => patient._id !== selectedPatient._id
      );
      setPatients(updatedPatients);

      setMessage("");
      setHasilDokter("");

      // Mengatur selectedPatient ke pasien selanjutnya jika masih ada pasien yang tersisa
      const nextPatientIndex =
        patients.findIndex((patient) => patient._id === selectedPatient._id) +
        1;
      setSelectedPatient(
        nextPatientIndex < patients.length ? patients[nextPatientIndex] : null
      );
    } catch (error) {
      console.error("Error sending message and doctor data:", error);
    }
  };

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setSelectedPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  return (
    <div>
      <Container className="mt-2">
        <h1 className="mb-4">HomeDoctor</h1>
        <div className="d-flex flex-wrap gap-3">
          {selectedPatient && (
            <div onClick={handleShowModal} className="w-100">
              <Card style={{ cursor: "pointer" }}>
                <Card.Body>
                  <Card.Title>{selectedPatient.nama}</Card.Title>
                  <Card.Text>ID: {selectedPatient._id}</Card.Text>
                  <Card.Text>Status: {selectedPatient.status}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
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
                    value={selectedPatient?.nama}
                    onChange={handleChangeInput}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>

        {selectedPatient && (
          <Form onSubmit={handleSubmitMessage} style={{ width: "100%" }}>
            <h3 className="mt-4">Detail Pasien: {selectedPatient.nama}</h3>
            <Form.Group controlId="formMessage">
              <Form.Label>Masukkan Pesan Penyakit</Form.Label>
              <InputGroup>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Masukkan pesan penyakit pasien"
                  name="hasildokter"
                  value={hasilDokter}
                  onChange={(e) => setHasilDokter(e.target.value)}
                  style={{ resize: "none" }}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formNamaDokter">
              <Form.Label>Nama Dokter</Form.Label>
              <Form.Control
                type="text"
                name="namaDokter"
                value={namaDokter}
                onChange={(e) => setNamaDokter(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Kirim Pesan
            </Button>
          </Form>
        )}
      </Container>
    </div>
  );
}

export default HomeDoctor;
