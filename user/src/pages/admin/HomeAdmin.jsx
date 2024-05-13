import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Chart from "react-apexcharts";
import * as XLSX from "xlsx";

function HomeAdmin() {
  const [monthlyChartData, setMonthlyChartData] = useState(null);
  const [genderChartData, setGenderChartData] = useState(null);
  const [kuotaHariIni, setKuotaHariIni] = useState(null);
  const [antreanHariIni, setAntreanHariIni] = useState(null);
  const username = localStorage.getItem("name");

  useEffect(() => {
    async function fetchSisaKuota() {
      try {
        const response = await fetch("http://localhost:3000/kuota/getkuota");
        if (!response.ok) {
          throw new Error("Gagal mengambil data sisa kuota.");
        }
        const data = await response.json();
        setKuotaHariIni(data.length > 0 ? data[0].Available : null);
        setAntreanHariIni(data.length > 0 ? data[0].antrean : null);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSisaKuota();

    const intervalId = setInterval(fetchSisaKuota, 600);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/pasien/list");
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }
      const data = await response.json();

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

  useEffect(() => {
    fetchData();

    const intervalFetch = setInterval(fetchData, 60000);
    return () => {
      clearInterval(intervalFetch);
    };
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
      if (monthlyCtx) {
        if (monthlyCtx.chart) {
          monthlyCtx.chart.destroy(); // Destroy existing chart instance
        }
        monthlyCtx.chart = new Chart(monthlyCtx, {
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
    }

    if (genderChartData) {
      const genderCtx = document.getElementById("genderChart");
      if (genderCtx) {
        if (genderCtx.chart) {
          genderCtx.chart.destroy(); // Destroy existing chart instance
        }
        genderCtx.chart = new Chart(genderCtx, {
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
    }
  }, [monthlyChartData, genderChartData]);

  return (
    <>
      <Container className="mt-2">
        <div className="lg:py-4">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-primary">Selamat Datang Kembali,</span>
            <div className="mt-2">
              <span className="text-black" style={{ fontSize: "64px" }}>
                {" "}
                {username}!
              </span>
            </div>
          </h2>
          {/* <p className="mt-4 text-gray-600">
            Berikut daftar antrean untuk memproses layanan pelanggan.
          </p> */}
        </div>
      </Container>

      <div>
        <Container className="mt-2">
          <div className="d-flex justify-content-between mb-4 mt-4">
            <Col md={5}>
              <article className="hover:animate-background relative block overflow-hidden rounded-xl border border-gray-100 p-0.5 shadow-md transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500"></span>
                <div className="rounded-[8px] bg-white p-4 !pt-8 sm:p-20">
                  <a>
                    <h1 className="mt-0.5 text-xl font-medium text-gray-900 text-center">
                      Sisa Kuota
                    </h1>
                    <h3 className="mt-0.5 text-xl font-medium text-gray-900 text-center">
                      {kuotaHariIni === null ? "Loading..." : kuotaHariIni}
                    </h3>
                  </a>
                </div>
              </article>
            </Col>
            <Col md={2}></Col>
            <Col md={5}>
              <article className="hover:animate-background relative block overflow-hidden rounded-xl border border-gray-100 p-0.5 shadow-md transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500"></span>
                <div className="rounded-[8px] bg-white p-4 !pt-8 sm:p-20">
                  <a>
                    <h1 className="mt-0.5 text-xl font-medium text-gray-900 text-center">
                      Antrean Ke Berapa
                    </h1>
                    <h3 className="mt-0.5 text-xl font-medium text-gray-900 text-center">
                      {antreanHariIni === null ? "Loading..." : antreanHariIni}
                    </h3>
                  </a>
                </div>
              </article>
            </Col>
          </div>
        </Container>
      </div>

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
