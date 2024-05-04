import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function HomeUser() {
  const sisaKuota = 5;
  const antreanHariIni = 10;

  return (
    <div>
      <Container className="mt-4">
        <h4>HomeUser</h4>
        <Row className="mt-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Sisa Kuota</Card.Title>
                <Card.Text>{sisaKuota}</Card.Text>
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
