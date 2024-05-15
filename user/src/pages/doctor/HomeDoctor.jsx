import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Modal, Row, Col } from "react-bootstrap";

function HomeDoctor({ loggedInUser }) {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const username = localStorage.getItem("name");
  const [message, setMessage] = useState("");
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
          namaDokter: username,
          hasilDokter: hasilDokter,
        }
      );
      console.log("Mengirim pesan dan data dokter:", username, hasilDokter);
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

  const handleClearForm = () => {
    setHasilDokter("");
  };

  return (
    <>
      <Container className="mt-2">
        <div className=" max-w-screen-xl py-8">
          <div className="sm:flex">
            <div className="sm:text-left">
              <h1 className=" font-bold text-blue-500 sm:text-5xl">
                Selamat Datang Kembali,
              </h1>
              <h1 className=" font-bold text-black sm:text-5xl">{username}!</h1>
              <div className="mt-3">
                <p className="mt-1.5 text-sm text-gray-500">
                  Ayo, semangat bekerja untuk menciptakan kesehatan dan
                  kenyamanan bagi setiap pasien!
                </p>
              </div>
            </div>
          </div>
        </div>

        <Row className="mt-4">
          <Col md={4}>
            {selectedPatient && (
              <article
                className="hover:animate-background relative block overflow-hidden rounded-xl border border-gray-100 p-0.5 shadow-md transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
                onClick={handleShowModal}
              >
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500"></span>

                <div className="rounded-[10px] bg-white p-4 !pt-8 sm:p-8">
                  <h3 className="block text-xs text-gray-500">
                    UID: {selectedPatient.uuiid}
                  </h3>

                  <h3 className="mt-0.5 text-2xl font-medium text-gray-900">
                    {selectedPatient.nama}
                  </h3>

                  <div className="mt-3">
                    <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                      {selectedPatient.status}
                    </span>
                  </div>
                </div>
              </article>
            )}
          </Col>

          <Col
            md={1}
            className="d-flex align-items-center justify-content-center"
          >
            {" "}
            {}
            <div className="h-100 border border-gray-300"></div>
          </Col>

          <Col md={7}>
            {selectedPatient && (
              <form onSubmit={handleSubmitMessage} style={{ width: "100%" }}>
                {/* <h3 className="mt-4">Detail Pasien: {selectedPatient.nama}</h3> */}
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                  <textarea
                    id="Pesan Penyakit"
                    className="w-full resize-none border-none align-top focus:ring-0 sm:text-sm p-3"
                    rows="12"
                    placeholder="Masukkan pesan penyakit pasien"
                    name="hasildokter"
                    value={hasilDokter}
                    onChange={(e) => setHasilDokter(e.target.value)}
                    style={{ resize: "none" }}
                  ></textarea>
                </div>
                <div>
                  <label className="sr-only" htmlFor="name">
                    Nama Dokter
                  </label>
                  <input
                    className="w-full rounded-lg form-control p-3 border-gray-400 mt-4"
                    placeholder="Nama"
                    type="text"
                    id="name"
                    name="nama"
                    value={username}
                    onChange={(e) => setHasilDokter(e.target.value)}
                    disabled
                  />
                </div>
                <div className="flex items-center justify-end gap-2 bg-white p-3">
                  <button
                    type="button"
                    className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                    onClick={handleClearForm}
                  >
                    Hapus Pesan
                  </button>
                  <button
                    type="button"
                    className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                    onClick={handleSubmitMessage}
                  >
                    Kirim Pesan
                  </button>
                </div>
              </form>
            )}
          </Col>
        </Row>
      </Container>

      {/* {selectedPatient && (
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
      )} */}

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
    </>
  );
}

export default HomeDoctor;
