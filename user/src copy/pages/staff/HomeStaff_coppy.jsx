import React, { useState, useEffect } from "react";
import { Container, Table, Button, Card } from "react-bootstrap";
import axios from "axios";

function HomeStaff() {
  const [antreanData, setAntreanData] = useState([]);
  const [sisaAntrean, setSisaAntrean] = useState(100);
  const [antreanKeBerapa, setAntreanKeBerapa] = useState(0);

  const fetchPasien = async () => {
    try {
      const response = await axios.get("http://localhost:3000/pasien/list");
      if (!response.data) {
        throw new Error("Failed to fetch data");
      }

      const sortedData = response.data.sort((a, b) => {
        if (a.status === "Diproses" && b.status !== "Diproses") {
          return -1;
        } else if (a.status !== "Diproses" && b.status === "Diproses") {
          return 1;
        } else {
          return 0;
        }
      });

      console.log(sortedData);
      setAntreanData(sortedData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchPasien();

    const interval = setInterval(() => {
      console.log("Reloading data...");
      fetchPasien();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (_id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/pasien/update/${_id}`,
        { status: "Diproses" }
      );
      console.log(response.data);
      const updatedData = antreanData.map((item) =>
        item._id === _id ? { ...item, status: "Diproses" } : item
      );
      setAntreanData(updatedData);
      setSisaAntrean((prev) => prev - 1);
      setAntreanKeBerapa((prev) => prev + 1);
      alert("Status antrean berhasil diubah!");
    } catch (error) {
      console.error(error.message);
      alert(
        "Terjadi kesalahan saat memperbarui status antrean. Silakan coba lagi."
      );
    }
  };

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
            {antreanDiproses.map((item, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.status}</td>
                <td>{item.status === "Diproses" && <p>Tunggu Update</p>}</td>
              </tr>
            ))}
            {antreanMenunggu.map((item, index) => (
              <tr key={antreanDiproses.length + index + 1}>
                <td>{antreanDiproses.length + index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.status}</td>
                <td>
                  {item.status === "Menunggu" && (
                    <Button onClick={() => updateStatus(item._id)}>
                      Proses
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
