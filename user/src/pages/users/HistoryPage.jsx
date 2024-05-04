import React, { useState } from "react";
import { Container, Card, Modal, Button } from "react-bootstrap";

function HistoryPage() {
  const historyData = [
    {
      id: 1,
      penyakit: "Flu",
      tanggal: "2023-05-20",
      detail: "Flu biasa tanpa komplikasi.",
    },
    {
      id: 2,
      penyakit: "Demam",
      tanggal: "2023-08-10",
      detail: "Demam ringan akibat cuaca.",
    },
    {
      id: 3,
      penyakit: "Batuk",
      tanggal: "2023-11-15",
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
    <div>
      <Container className="mt-4">
        <h4>HistoryPage</h4>
        <div>
          {historyData.map((item) => (
            <Card
              key={item.id}
              className="mb-2"
              onClick={() => handleItemClick(item)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <Card.Title>{item.penyakit}</Card.Title>
                <Card.Text>Tanggal: {item.tanggal}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>

      {/* Modal untuk menampilkan detail item */}
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HistoryPage;
