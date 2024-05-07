import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { PasienInit } from "../../data/Pasien";

function AntreanPage() {
  const [formData, setFormData] = useState(PasienInit);

  const onCreatePasien = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/pasien/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat mendaftarkan pasien.");
      }
      const data = await response.json();
      console.log(data);
      alert("Pasien berhasil didaftarkan!");
      setFormData(PasienInit);
    } catch (error) {
      console.error(error.message);
      alert("Terjadi kesalahan saat mendaftarkan pasien. Silakan coba lagi.");
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

  const formatRupiah = (angka) => {
    const reverse = angka.toString().split("").reverse().join("");
    const ribuan = reverse.match(/\d{1,3}/g);
    const formattedValue = ribuan.join(".").split("").reverse().join("");
    return `Rp ${formattedValue}`;
  };

  return (
    <div>
      <Container className="mt-4">
        <h4>Form Pendaftaran Antrean</h4>
        <Form onSubmit={onCreatePasien}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formNama">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formTelepon">
                <Form.Label>No Telp</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan Nomor Telepon"
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleChange}
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
                  placeholder={formatRupiah(formData.totalPembayaran)}
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
      </Container>
    </div>
  );
}

export default AntreanPage;
