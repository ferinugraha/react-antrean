import React, { useState, useEffect } from "react";
import { Container, Card, Modal, Button } from "react-bootstrap";

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
      // Urutkan data berdasarkan createdAt
      const sortedData = order === "desc" ? data.reverse() : data;
      setHistoryData(sortedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistoryData("desc"); // Mulai dengan data terbaru
  }, []);

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
                <Card.Title>{item.keluhan}</Card.Title>
                <Card.Text>Tanggal: {item.createdAt}</Card.Text>
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
                <strong>Nama Penyakit:</strong> {selectedItem.keluhan}
              </p>
              <p>
                <strong>Tanggal:</strong> {selectedItem.createdAt}
              </p>
              <p>
                <strong>Detail:</strong> {selectedItem.hasilDokter}
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
