import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

function AntreanPage() {
  const [formData, setFormData] = useState({
    nama: "",
    notelp: "",
    jenisKelamin: "",
    umur: "",
    alamat: "",
    keluhan: "",
    jenisPembayaran: "",
    totalPembayaran: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "jenisPembayaran") {
      const totalPembayaran = value === "bpjs" ? "0" : "100000";
      setFormData((prevData) => ({
        ...prevData,
        jenisPembayaran: value,
        totalPembayaran,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const formatRupiah = (angka) => {
    const reverse = angka.toString().split("").reverse().join("");
    const ribuan = reverse.match(/\d{1,3}/g);
    const formattedValue = ribuan.join(".").split("").reverse().join("");
    return `Rp ${formattedValue}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      <Container className="mt-4">
        <h4>Form Pendaftaran Antrean</h4>
        <Form onSubmit={handleSubmit}>
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
              <Form.Group controlId="formtelp">
                <Form.Label>No Telp</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Masukkan Nomoer Telepon"
                  name="notelp"
                  value={formData.notelp}
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
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
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
                  placeholder="Rp 0"
                  name="totalPembayaran"
                  value={formatRupiah(formData.totalPembayaran)}
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
