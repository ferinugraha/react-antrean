import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
// import { Container } from "react-bootstrap";
// import History from "../../../app/_components/History";
import "../../../app/globals.css";

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
    <>
      <div className="mt-4">
        <Container>
          <h1 style={{ fontWeight: "500", fontSize: "32px" }}>
            Riwayat Antrean
          </h1>
          <Row>
            {historyData.map((item) => (
              <Col key={item.id} md={6} className="mt-2">
                <article
                  className="hover:animate-background relative block overflow-hidden rounded-xl border border-gray-100 p-0.5 shadow-md transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
                  onClick={() => handleItemClick(item)}
                >
                  <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-400"></span>
                  <div className="rounded-[10px] bg-white p-4 !pt-8 sm:p-8">
                    <time className="block text-xs text-gray-500">
                      {item.createdAt.slice(0, 10)}
                    </time>

                    <h1 className="mt-0.5 text-lg font-medium text-gray-900 item-keluhan">
                      {item.keluhan}
                    </h1>

                    <p className="text-right text-xs text-gray-500">
                      <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                        {item.namaDokter}
                      </span>
                    </p>
                  </div>
                </article>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <Modal
        className="mt-8"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail Informasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <div>
                <Col>
                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label>Nama</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedItem?.nama || ""}
                        disabled
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label>Jenis Kelamin</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedItem?.gender || ""}
                      disabled
                    />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label>Umur</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedItem?.umur || ""}
                      disabled
                    />
                  </Form.Group>
                </Form>
              </div>

              {/* <div className="grid grid-cols-2 gap-4"> */}
              {/* <Form>
                  <Form.Label>Email</Form.Label>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      value={pengguna[0].email}
                      disabled
                    />
                  </Form.Group>
                </Form> */}
              <div>
                <Form>
                  <Form.Label>Nomor Telefon</Form.Label>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      value={selectedItem?.telepon || ""}
                      disabled
                    />
                  </Form.Group>
                </Form>
              </div>

              <div>
                <Form>
                  <Form.Label>Alamat</Form.Label>
                  <Form.Group className="w-full">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      value={selectedItem?.alamat || ""}
                      disabled
                    />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Label>Keluhan</Form.Label>
                  <Form.Group className="mb-2">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      value={selectedItem?.keluhan || ""}
                      disabled
                    />
                  </Form.Group>
                </Form>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Form>
                  <Form.Label>Jenis Pembayaran</Form.Label>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      value={selectedItem?.jenisPembayaran || ""}
                      disabled
                    />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Label>Total Pembayaran</Form.Label>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      value={selectedItem.totalPembayaran}
                      disabled
                    />
                  </Form.Group>
                </Form>
              </div>

              <div className="my-6">
                <span className="flex items-center">
                  <span className="h-px flex-1 bg-black"></span>
                  <span className="shrink-0 px-6">
                    Catatan Dokter: {selectedItem.namaDokter}
                  </span>
                  <span className="h-px flex-1 bg-black"></span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Form>
                  <Form.Label>Penyakit</Form.Label>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      value={selectedItem.keluhan}
                      disabled
                    />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Label>Tanggal</Form.Label>
                  <Form.Group className="mb-2">
                    <Form.Control
                      type="text"
                      value={selectedItem.createdAt.slice(0, 10)}
                      disabled
                    />
                  </Form.Group>
                </Form>
              </div>
              <div>
                <Form>
                  <Form.Label>Detail</Form.Label>
                  <Form.Group className="mb-2">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      value={selectedItem.hasilDokter}
                      disabled
                    />
                  </Form.Group>
                </Form>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HistoryPage;
