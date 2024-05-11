import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Chart from "react-apexcharts";
import * as XLSX from "xlsx";

function HomeAdmin() {
  const [monthlyChartData, setMonthlyChartData] = useState(null);
  const [genderChartData, setGenderChartData] = useState(null);
  const namaAdmin = "Sarah";

  useEffect(() => {
    const monthlyLabels = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
    ];
    const monthlyData = [20, 15, 25, 30, 35, 40];

    setMonthlyChartData({
      labels: monthlyLabels,
      data: monthlyData,
    });

    const genderLabels = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
    ];
    const genderData = [
      { perempuan: 10, lakiLaki: 15 },
      { perempuan: 12, lakiLaki: 18 },
      { perempuan: 14, lakiLaki: 20 },
      { perempuan: 16, lakiLaki: 22 },
      { perempuan: 18, lakiLaki: 24 },
      { perempuan: 20, lakiLaki: 26 },
    ];

    setGenderChartData({
      labels: genderLabels,
      data: genderData,
    });
  }, []);

  const exportMonthlyChartData = () => {
    if (monthlyChartData) {
      const ws = XLSX.utils.json_to_sheet(
        monthlyChartData.labels.map((label, index) => ({
          Year: new Date().getFullYear(),
          Month: label,
          Jumlah: monthlyChartData.data[index],
        }))
      );
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "MonthlyChartData");
      XLSX.writeFile(wb, "Jumlah_Perbulan_data.xlsx");
    }
  };

  const exportGenderChartData = () => {
    if (genderChartData) {
      const ws = XLSX.utils.json_to_sheet(
        genderChartData.labels.map((label, index) => ({
          Tahun: new Date().getFullYear(),
          Bulan: label,
          Perempuan: genderChartData.data[index].perempuan,
          "Laki-laki": genderChartData.data[index].lakiLaki,
        }))
      );
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "GenderChartData");
      XLSX.writeFile(wb, "Jumlah_Gender_data.xlsx");
    }
  };

  return (
    <>
      <Container className="mt-2">
        <div className="lg:py-4">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-primary">Selamat Datang Kembali,</span>
            <div className="mt-2">
              <span className="text-black" style={{ fontSize: "64px" }}>
                {" "}
                {namaAdmin}!
              </span>
            </div>
          </h2>
          {/* <p className="mt-4 text-gray-600">
            Berikut daftar antrean untuk memproses layanan pelanggan.
          </p> */}
        </div>
      </Container>

      <Container className="mt-5">
        <Row className="mb-4">
          <Col className="mt-2">
            <h5 style={{ textAlign: "center", fontWeight: "bold" }}>
              Grafik Jumlah Pasien per Bulan
            </h5>
            <Chart
              options={{
                chart: {
                  type: "bar",
                  fontFamily: "Inter, sans-serif",
                  toolbar: {
                    show: false,
                  },
                },
                xaxis: {
                  categories: monthlyChartData ? monthlyChartData.labels : [],
                },
                yaxis: {
                  show: true,
                  labels: {
                    formatter: function (val) {
                      return val.toFixed(0);
                    },
                  },
                },
                dataLabels: {
                  enabled: false,
                },
              }}
              series={[
                {
                  name: "Jumlah Pasien",
                  data: monthlyChartData ? monthlyChartData.data : [],
                },
              ]}
              type="bar"
              height={300}
            />
            <Button onClick={exportMonthlyChartData} variant="primary">
              Ekspor
            </Button>
          </Col>
          <Col className="mt-2">
            <h5 style={{ textAlign: "center", fontWeight: "bold" }}>
              Grafik Jumlah Pasien Perempuan dan Laki-Laki per Bulan
            </h5>
            <Chart
              options={{
                chart: {
                  type: "bar",
                  fontFamily: "Inter, sans-serif",
                  toolbar: {
                    show: false,
                  },
                },
                xaxis: {
                  categories: genderChartData ? genderChartData.labels : [],
                },
                yaxis: {
                  show: true,
                  labels: {
                    formatter: function (val) {
                      return val.toFixed(0);
                    },
                  },
                },
                dataLabels: {
                  enabled: false,
                },
              }}
              series={[
                {
                  name: "Perempuan",
                  data: genderChartData
                    ? genderChartData.data.map((item) => item.perempuan)
                    : [],
                },
                {
                  name: "Laki-Laki",
                  data: genderChartData
                    ? genderChartData.data.map((item) => item.lakiLaki)
                    : [],
                },
              ]}
              type="bar"
              height={300}
            />
            <Button onClick={exportGenderChartData} variant="primary">
              Ekspor
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomeAdmin;
