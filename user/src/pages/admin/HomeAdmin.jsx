import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Chart from "chart.js/auto";
import axios from "axios";
import * as XLSX from "xlsx";

function HomeAdmin() {
  const [monthlyChartData, setMonthlyChartData] = useState(null);
  const [genderChartData, setGenderChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pasien/list");
        if (!response.data) {
          throw new Error("Failed to fetch data.");
        }
        const data = response.data;

        const monthlyCounts = data.reduce((acc, curr) => {
          const month = new Date(curr.createdAt).toLocaleDateString("en-US", {
            month: "long",
          });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});

        const monthlyLabels = Object.keys(monthlyCounts);
        const monthlyCountsData = monthlyLabels.map(
          (month) => monthlyCounts[month]
        );

        setMonthlyChartData({
          labels: monthlyLabels,
          data: monthlyCountsData,
        });

        const genderCounts = data.reduce((acc, curr) => {
          const month = new Date(curr.createdAt).toLocaleDateString("en-US", {
            month: "long",
          });
          if (!acc[month]) {
            acc[month] = { perempuan: 0, lakiLaki: 0 };
          }
          if (curr.gender === "perempuan") {
            acc[month].perempuan += 1;
          } else {
            acc[month].lakiLaki += 1;
          }
          return acc;
        }, {});

        const genderLabels = Object.keys(genderCounts);
        const genderCountsData = Object.values(genderCounts);

        setGenderChartData({
          labels: genderLabels,
          data: genderCountsData,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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

  useEffect(() => {
    if (monthlyChartData) {
      const monthlyCtx = document.getElementById("monthlyChart");
      new Chart(monthlyCtx, {
        type: "bar",
        data: {
          labels: monthlyChartData.labels,
          datasets: [
            {
              label: "Jumlah Pasien",
              data: monthlyChartData.data,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    if (genderChartData) {
      const genderCtx = document.getElementById("genderChart");
      new Chart(genderCtx, {
        type: "bar",
        data: {
          labels: genderChartData.labels,
          datasets: [
            {
              label: "Perempuan",
              data: genderChartData.data.map((item) => item.perempuan),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Laki-Laki",
              data: genderChartData.data.map((item) => item.lakiLaki),
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [monthlyChartData, genderChartData]);

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col className="mt-2">
          <h5>Grafik Jumlah Pasien per Bulan</h5>
          <canvas id="monthlyChart" width="400" height="250"></canvas>
          <Button onClick={exportMonthlyChartData} variant="primary">
            Export
          </Button>
        </Col>
        <Col className="mt-2">
          <h5>Grafik Jumlah Pasien Perempuan dan Laki-Laki per Bulan</h5>
          <canvas id="genderChart" width="400" height="250"></canvas>
          <Button onClick={exportGenderChartData} variant="primary">
            Export
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeAdmin;
