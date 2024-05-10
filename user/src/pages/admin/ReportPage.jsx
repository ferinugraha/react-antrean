import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
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
          <p>Nama: {selectedPatient?.nama}</p>
          <p>Gender: {selectedPatient?.gender}</p>
          <p>Alamat: {selectedPatient?.alamat}</p>
          <p>Jenis Pembayaran: {selectedPatient?.jenisPembayaran}</p>
          <p>Telepon: {selectedPatient?.telepon}</p>
          <p>Umur: {selectedPatient?.umur}</p>
          <p>Keluhan: {selectedPatient?.keluhan}</p>
          <p>Status: {selectedPatient?.status}</p>
          <p>Total Pembayaran: {selectedPatient?.totalPembayaran}</p>
          <p>Nama Dokter: {selectedPatient?.namaDokter}</p>
          <p>Nama Staff: {selectedPatient?.namaStaff}</p>
          <p>Hasil Dokter: {selectedPatient?.hasilDokter}</p>
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
