import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { PasienInit } from "../../data/Pasien";

function HomeUser() {
  const [sisaKuota, setSisaKuota] = useState(null);
  const [queueStatus, setQueueStatus] = useState(null);
  const username = localStorage.getItem("name");
  const uuiid = localStorage.getItem("uuiid");
  const antreanHariIni = 10;

  const [formData, setFormData] = useState(PasienInit);

  const onCreatePasien = async (event) => {
    event.preventDefault();

    try {
      const updatedFormData = { ...formData, nama: username, uuiid: uuiid };

      const response = await fetch("http://localhost:3000/pasien/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await response.json();
      if (response.status === 400 && data.message === "Kuota habis") {
        alert("Maaf, kuota untuk pasien hari ini sudah habis.");
      } else {
        alert("Pasien berhasil didaftarkan!");
        console.log(data);
        setFormData(PasienInit);
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };
    if (name === "jenisPembayaran" && value === "bpjs") {
      updatedData = { ...updatedData, totalPembayaran: 0 };
    } else if (name === "jenisPembayaran" && value === "tunai") {
      updatedData = { ...updatedData, totalPembayaran: 100000 };
    }
    setFormData(updatedData);
  };

  // const cekantreanuser = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/pasien/cekantrean/${uuiid}`
  //     );
  //     const data = await response.json();
  //     const status = data.length > 0 ? data[0].status : null;

  //     setQueueStatus(status);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const cekantreanuser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/pasien/cekantrean/${uuiid}`
      );
      const data = await response.json();

      const filteredQueue = data.filter(
        (item) => item.status === "Menunggu" || item.status === "Diproses"
      );

      const status = filteredQueue.length > 0 ? filteredQueue[0].status : null;

      setQueueStatus(status);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchSisaKuota() {
      try {
        const response = await fetch("http://localhost:3000/kuota/getkuota");
        if (!response.ok) {
          throw new Error("Gagal mengambil data sisa kuota.");
        }
        const data = await response.json();
        setSisaKuota(data.length > 0 ? data[0].Available : null);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSisaKuota();
    cekantreanuser();

    const intervalId = setInterval(fetchSisaKuota, 60000);
    const intervalantrean = setInterval(cekantreanuser, 60000);
    return () => {
      clearInterval(intervalId);
      clearInterval(intervalantrean);
    };
  }, []);

  return (
    <div>
      <Container className="mt-4 mb-5">
        <h4>HomeUser</h4>
        <p>{`Selamat datang, ${username}`}</p>
        <Row className="mt-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Sisa Kuota</Card.Title>
                <Card.Text>
                  {sisaKuota === null ? "Loading..." : sisaKuota}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Antrean Hari Ini</Card.Title>
                <Card.Text>{antreanHariIni}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="mt-5">
          {queueStatus === "Menunggu" || queueStatus === "Diproses" ? (
            <h5 className="text-center">
              Anda sudah mendaftar, status: {queueStatus}
            </h5>
          ) : (
            <>
              <h4 className="text-center">Form Pendaftaran Antrean</h4>

              <Form onSubmit={onCreatePasien}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formNama">
                      <Form.Label>Nama</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan nama"
                        name="nama"
                        value={username}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formTelepon">
                      <Form.Label>No Telp</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Masukkan Nomor Telepon"
                        name="telepon"
                        value={formData.telepon}
                        onChange={handleChange}
                        required
                        maxLength={13}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formJenisKelamin">
                      <Form.Label>Jenis Kelamin</Form.Label>
                      <Form.Control
                        as="select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Pilih jenis kelamin</option>
                        <option value="laki-laki">Laki-laki</option>
                        <option value="perempuan">Perempuan</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formUmur">
                      <Form.Label>Umur</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Masukkan umur"
                        name="umur"
                        value={formData.umur}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formAlamat">
                      <Form.Label>Alamat</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Masukkan alamat"
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="formKeluhan">
                      <Form.Label>Keluhan</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Masukkan keluhan"
                        name="keluhan"
                        value={formData.keluhan}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formJenisPembayaran">
                      <Form.Label>Jenis Pembayaran</Form.Label>
                      <Form.Control
                        as="select"
                        name="jenisPembayaran"
                        value={formData.jenisPembayaran}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Pilih jenis pembayaran</option>
                        <option value="tunai">Tunai</option>
                        <option value="bpjs">BPJS</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formTotalPembayaran">
                      <Form.Label>Total Pembayaran</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="0"
                        name="totalPembayaran"
                        value={formData.totalPembayaran}
                        onChange={handleChange}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit" className="mt-4">
                  Submit
                </Button>
              </Form>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default HomeUser;
