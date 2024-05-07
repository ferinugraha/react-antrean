import React, { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
// import { Container } from "react-bootstrap";
// import History from "../../../app/_components/History";
import "../../../app/globals.css";

function HistoryPage() {
  const historyData = [
    {
      id: 1,
      penyakit: "Flu",
      tanggal: "2023-05-20",
      namaDokter: "Dr. Raditya Dika",
      detail: "Flu biasa tanpa komplikasi.",
    },
    {
      id: 2,
      penyakit: "Demam",
      tanggal: "2023-08-10",
      namaDokter: "Dr. Tony Stark",
      detail: "Demam ringan akibat cuaca.",
    },
    {
      id: 3,
      penyakit: "Batuk",
      tanggal: "2023-11-15",
      namaDokter: "Dr. Calvin Evans",
      detail: "Batuk karena alergi debu.",
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
                  className="hover:animate-background rounded-xl bg-blue-300 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="rounded-[10px] bg-white p-4 !pt-8 sm:p-8">
                    <time
                      datetime={item.tanggal}
                      className="block text-xs text-gray-500"
                    >
                      {item.tanggal}
                    </time>

                    <h1 className="mt-0.5 text-lg font-medium text-gray-900">
                      {item.penyakit}
                    </h1>

                    <p className="text-right text-xs text-gray-500">
                      {item.namaDokter}
                    </p>
                  </div>
                </article>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* <div className="mt-4 flex flex-wrap gap-1">
                    <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                      Snippet
                    </span>

                    <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                      JavaScript
                    </span>
                  </div> */}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Penyakit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <div>
              <p>
                <strong>Nama Penyakit:</strong> {selectedItem.penyakit}
              </p>
              <p>
                <strong>Tanggal:</strong> {selectedItem.tanggal}
              </p>
              <p>
                <strong>Detail:</strong> {selectedItem.detail}
              </p>
            </div>
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
