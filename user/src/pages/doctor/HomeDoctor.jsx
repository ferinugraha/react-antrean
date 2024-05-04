import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";

function HomeDoctor() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Simulasi data pasien dengan status "proses"
    const dummyData = [
      { id: 1, name: "John Doe", status: "proses" },
      { id: 2, name: "Jane Doe", status: "proses" },
      { id: 3, name: "Alice Smith", status: "proses" },
    ];

    setPatients(dummyData);
  }, []);

  useEffect(() => {
    // Pilih pasien dengan status "proses" pertama
    const firstProsesPatient = patients.find(
      (patient) => patient.status === "proses"
    );
    setSelectedPatient(firstProsesPatient);
  }, [patients]);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    // Ubah status pasien menjadi "selesai"
    const updatedPatients = patients.map((patient) =>
      patient.id === selectedPatient.id
        ? { ...patient, status: "selesai" }
        : patient
    );
    setPatients(updatedPatients);

    // Proses pengiriman pesan penyakit pasien ke backend atau penyimpanan data sesuai kebutuhan aplikasi
    console.log("Mengirim pesan:", message);
    // Berikan respons atau feedback sesuai kebutuhan
    alert(
      `Pesan "${message}" berhasil dikirim untuk pasien ${selectedPatient.name}`
    );
    setMessage(""); // Reset pesan setelah dikirim
  };

  return (
    <div>
      <Container className="mt-2">
        <h1 className="mb-4">HomeDoctor</h1>
        <div className="d-flex flex-wrap gap-3">
          {selectedPatient && (
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>{selectedPatient.name}</Card.Title>
                <Card.Text>ID: {selectedPatient.id}</Card.Text>
                <Card.Text>Status: {selectedPatient.status}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </div>

        {/* Form untuk menambahkan pesan penyakit */}
        {selectedPatient && (
          <Form onSubmit={handleSubmitMessage} style={{ width: "100%" }}>
            <h3 className="mt-4">Detail Pasien: {selectedPatient.name}</h3>
            <Form.Group controlId="formMessage">
              <Form.Label>Masukkan Pesan Penyakit</Form.Label>
              <InputGroup>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Masukkan pesan penyakit pasien"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ resize: "none" }}
                />
              </InputGroup>
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
