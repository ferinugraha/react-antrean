import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function HomeUser() {
  const [sisaKuota, setSisaKuota] = useState(null);
  const antreanHariIni = 10;

  useEffect(() => {
    async function fetchSisaKuota() {
      try {
        const response = await fetch("http://localhost:3000/kuota/getkuota");
        if (!response.ok) {
          throw new Error("Gagal mengambil data sisa kuota.");
        }
        const data = await response.json();
        console.log(data);
        setSisaKuota(data.length > 0 ? data[0].Available : null);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSisaKuota();

    const intervalId = setInterval(fetchSisaKuota, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Container className="mt-4">
        <h4>HomeUser</h4>
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
      </Container>
    </div>
  );
}

export default HomeUser;
