import React, { useState } from "react";
import { Container, Button, Modal, Form, Col } from "react-bootstrap";

function ReportPage() {
  const [completedPatients, setCompletedPatients] = useState([
    {
      _id: "1",
      nama: "John Doe",
      telepon: "1234567890",
      status: "Selesai",
      namaDokter: "Dr. Smith",
      namaStaff: "Nurse Jane",
      gender: "Male",
      alamat: "123 Main St",
      jenisPembayaran: "Bayar Sendiri",
      umur: 35,
      keluhan: "Fever",
      totalPembayaran: 100000,
      hasilDokter: "Recovered",
    },
    {
      _id: "2",
      nama: "Jane Smith",
      telepon: "0987654321",
      status: "Selesai",
      namaDokter: "Dr. Johnson",
      namaStaff: "Nurse Kate",
      gender: "Female",
      alamat: "456 Elm St",
      jenisPembayaran: "BPJS",
      umur: 45,
      keluhan: "Headache",
      totalPembayaran: 0,
      hasilDokter: "In recovery",
    },
    {
      _id: "3",
      nama: "Jane Smith",
      telepon: "0987654321",
      status: "Selesai",
      namaDokter: "Dr. Johnson",
      namaStaff: "Nurse Kate",
      gender: "Female",
      alamat: "456 Elm St",
      jenisPembayaran: "BPJS",
      umur: 45,
      keluhan: "Headache",
      totalPembayaran: 0,
      hasilDokter: "In recovery",
    },
    {
      _id: "4",
      nama: "Jane Smith",
      telepon: "0987654321",
      status: "Selesai",
      namaDokter: "Dr. Johnson",
      namaStaff: "Nurse Kate",
      gender: "Female",
      alamat: "456 Elm St",
      jenisPembayaran: "BPJS",
      umur: 45,
      keluhan: "Headache",
      totalPembayaran: 0,
      hasilDokter: "In recovery",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Container className="mt-5">
        <div className="lg:py-2 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-black">Halaman Laporan</span>
          </h2>
          {/* <p className="mt-4 text-gray-600">
            Berikut daftar antrean untuk memproses layanan pelanggan.
          </p> */}
        </div>
      </Container>

      <Container className="mt-5">
        <div className="rounded-lg border border-gray-200">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Nama
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Telepon
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Nama Dokter
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Nama Staff
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {completedPatients.map((patient) => (
                  <tr key={patient._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      {patient.nama}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {patient.telepon}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {patient.status}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {patient.namaDokter}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {patient.namaStaff}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
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
            </table>
          </div>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Detail Pasien: {selectedPatient?.nama}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label>Nama:</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedPatient?.nama}
                        disabled
                      />
                    </Form.Group>
                  </Form>

                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label>Gender:</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedPatient?.gender}
                        disabled
                      />
                    </Form.Group>
                  </Form>
                </div>

                <div>
                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label>Alamat:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        type="text"
                        value={selectedPatient?.alamat}
                        disabled
                      />
                    </Form.Group>
                  </Form>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label>Umur:</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedPatient?.umur}
                        disabled
                      />
                    </Form.Group>
                  </Form>
                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label>Telepon:</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedPatient?.telepon}
                        disabled
                      />
                    </Form.Group>
                  </Form>
                </div>

                <div>
                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label>Keluhan:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        type="text"
                        value={selectedPatient?.keluhan}
                        disabled
                      />
                    </Form.Group>
                  </Form>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label>Nama Staff:</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedPatient?.namaStaff}
                        disabled
                      />
                    </Form.Group>
                  </Form>
                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label>Status:</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedPatient?.status}
                        disabled
                      />
                    </Form.Group>
                  </Form>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label>Jenis Pembayaran:</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedPatient?.jenisPembayaran}
                        disabled
                      />
                    </Form.Group>
                  </Form>
                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label>Total Pembayaran:</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedPatient?.totalPembayaran}
                        disabled
                      />
                    </Form.Group>
                  </Form>
                </div>

                <div>
                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label>Nama Dokter:</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedPatient?.namaDokter}
                        disabled
                      />
                    </Form.Group>
                  </Form>
                </div>

                <div>
                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label>Hasil Dokter:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        type="text"
                        value={selectedPatient?.hasilDokter}
                        disabled
                      />
                    </Form.Group>
                  </Form>
                </div>
              </>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseModal}>
                Tutup
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    </>
  );
}

export default ReportPage;
