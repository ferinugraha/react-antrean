import React, { useState, useEffect } from "react";
import { Container, Table, Button, Card } from "react-bootstrap";

function HomeStaff() {
  const [antreanData, setAntreanData] = useState([
    { id: 1, nama: "John Doe", status: "Menunggu" },
    { id: 2, nama: "Jane Doe", status: "Menunggu" },
    { id: 3, nama: "Alice", status: "Menunggu" },
  ]);

  const [sisaAntrean, setSisaAntrean] = useState(100);
  const [antreanKeBerapa, setAntreanKeBerapa] = useState(0);

  const updateStatus = (id) => {
    const updatedData = antreanData.map((item) =>
      item.id === id ? { ...item, status: "Diproses" } : item
    );
    setAntreanData(updatedData);
    setSisaAntrean((prev) => prev - 1);
    setAntreanKeBerapa((prev) => prev + 1);
    alert("Status antrean berhasil diubah!");
  };

  const finishAntrean = (id) => {
    const updatedData = antreanData.map((item) =>
      item.id === id ? { ...item, status: "Selesai" } : item
    );
    setAntreanData(updatedData);
    alert("Antrean telah selesai diproses!");

    // Tambahkan kembali ke dalam kuota setelah waktu selesai
    setTimeout(() => {
      setSisaAntrean((prev) => prev + 1);
    }, 60000); // 1 menit
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Reloading data...");
      setAntreanData((prevData) => [...prevData]);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const antreanMenunggu = antreanData.filter(
    (item) => item.status === "Menunggu"
  );

  const antreanDiproses = antreanData.filter(
    (item) => item.status === "Diproses"
  );

  return (
    <div>
      <Container className="mt-2">
        <h4>HomeStaff</h4>
        <div className="d-flex justify-content-between mb-4 mt-4">
          <Card style={{ width: "45%" }}>
            <Card.Body>
              <Card.Title>Sisa Antrean</Card.Title>
              <Card.Text>{sisaAntrean}</Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "45%" }}>
            <Card.Body>
              <Card.Title>Antrean Ke Berapa</Card.Title>
              <Card.Text>{antreanKeBerapa}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {antreanMenunggu.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.status}</td>
                <td>
                  {item.status === "Menunggu" && (
                    <Button onClick={() => updateStatus(item.id)}>
                      Proses
                    </Button>
                  )}
                </td>
              </tr>
            ))}
            {antreanDiproses.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.status}</td>
                <td>
                  {item.status === "Diproses" && (
                    <Button onClick={() => finishAntrean(item.id)}>
                      Selesai
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default HomeStaff;
