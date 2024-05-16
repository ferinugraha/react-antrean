import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Hero from "../../../app/_components/Hero";
import "../../../app/globals.css";
import { PasienInit } from "../../data/Pasien";

function HomeUser() {
  const [sisaKuota, setSisaKuota] = useState(null);
  const [queueStatus, setQueueStatus] = useState(null);
  const username = localStorage.getItem("name");
  const uuiid = localStorage.getItem("uuiid");
  const [antreanHariIni, setAntreanHariIni] = useState(null);
  const [antreanAnda, setAntreanAnda] = useState(null);
  const [formData, setFormData] = useState(PasienInit);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");

  const registerSectionRef = useRef(null);

  const scrollToRegister = () => {
    registerSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const onCreatePasien = async (event) => {
    event.preventDefault();

    try {
      const updatedFormData = { ...formData, nama: username, uuiid: uuiid };

      const response = await fetch("http://localhost:3000/pasien/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await response.json();
      if (
        response.status === 400 &&
        data.error === "Maaf, kuota untuk hari ini sudah habis"
      ) {
        alert("Maaf, kuota untuk pasien hari ini sudah habis.");
      } else {
        alert("Pasien berhasil didaftarkan!");
        console.log(data);
        setFormData(PasienInit);
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };
    if (name === "jenisPembayaran" && value === "bpjs") {
      updatedData = { ...updatedData, totalPembayaran: 0 };
    } else if (name === "jenisPembayaran" && value === "tunai") {
      updatedData = { ...updatedData, totalPembayaran: 100000 };
    }
    setFormData(updatedData);
  };

  const cekantreanuser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/pasien/cekantrean/${uuiid}`
      );
      const data = await response.json();

      const filteredQueue = data.filter(
        (item) => item.status === "Menunggu" || item.status === "Diproses"
      );

      const status = filteredQueue.length > 0 ? filteredQueue[0].status : null;
      setQueueStatus(status);

      const today = new Date().toISOString().slice(0, 10);

      const cekHari = data.filter(
        (item) =>
          item.status === "Menunggu" ||
          (item.status === "Diproses" && item.createdAt.slice(0, 10) === today)
      );

      const antreanAnda = cekHari.length > 0 ? cekHari[0].antrean : null;

      setAntreanAnda(antreanAnda);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchSisaKuota() {
      try {
        const response = await fetch("http://localhost:3000/kuota/getkuota");
        if (!response.ok) {
          throw new Error("Gagal mengambil data sisa kuota.");
        }
        const data = await response.json();
        setSisaKuota(data.length > 0 ? data[0].Available : null);
        setAntreanHariIni(data.length > 0 ? data[0].antrean : null);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSisaKuota();
    cekantreanuser();

    const intervalId = setInterval(fetchSisaKuota, 800);
    const intervalantrean = setInterval(cekantreanuser, 800);
    return () => {
      clearInterval(intervalId);
      clearInterval(intervalantrean);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <>
      <Container>
        <h4>
          <Hero />
        </h4>
        <Row className="mt-4">
          <Col md={4}>
            <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
              <div className="rounded-[8px] bg-white p-4 !pt-8 sm:p-20">
                <a>
                  <h1 className="mt-0.5 text-xl font-medium text-gray-900 text-center">
                    Sisa Kuota
                  </h1>
                  <h3 className="mt-0.5 text-xl font-medium text-gray-900 text-center">
                    {sisaKuota === null ? "Loading..." : sisaKuota}
                  </h3>
                </a>
              </div>
            </article>
          </Col>
          <Col md={4}>
            <article className="hover:animate-background rounded-xl bg-blue-700 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
              <div className="rounded-[8px] bg-white p-4 !pt-8 sm:p-20">
                <a>
                  <h1 className="mt-0.5 text-xl font-medium text-gray-900 text-center">
                    Antrean Hari Ini
                  </h1>
                  <h3 className="mt-0.5 text-xl font-medium text-gray-900 text-center">
                    {antreanHariIni}
                  </h3>
                </a>
              </div>
            </article>
          </Col>
          <Col md={4}>
            <article className="hover:animate-background rounded-xl bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
              <div className="rounded-[8px] bg-white p-4 !pt-8 sm:p-20">
                <a>
                  <h1 className="mt-0.5 text-xl font-medium text-gray-900 text-center">
                    Antrean Anda
                  </h1>
                  <h3 className="mt-0.5 text-xl font-medium text-gray-900 text-center">
                    {antreanAnda === null ? "-" : antreanAnda}
                  </h3>
                </a>
              </div>
            </article>
          </Col>
        </Row>

        <div className="mt-5">
          {queueStatus === "Menunggu" || queueStatus === "Diproses" ? (
            <div className="rounded-lg bg-indigo-600 px-4 py-3 text-white shadow-lg">
              <p className="text-center text-sm font-medium">
                Anda Sudah Mendaftar || Status: {queueStatus}
              </p>
            </div>
          ) : (
            <>
              <section
                ref={registerSectionRef}
                id="register"
                className="bg-gray-100"
              >
                <section
                  ref={registerSectionRef}
                  id="register"
                  className="bg-gray-100"
                >
                  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                      <div className="lg:col-span-2 lg:py-12">
                        <p className="max-w-xl text-lg">
                          Daftarkan diri Anda sekarang untuk mendapatkan nomor
                          antrean. Dengan mendaftar, Anda dapat memilih cara
                          pembayaran dan memberikan pesan atau keluhan jika
                          diperlukan
                        </p>

                        <div className="mt-8">
                          <a
                            href="#"
                            className="text-2xl font-bold text-blue-500"
                          >
                            {" "}
                            021 1000 200{" "}
                          </a>

                          <address className="mt-2 not-italic">
                            Jl. Tebet Timur Dalam IX No.2, Tebet Tim., Kec.
                            Tebet, Kota Jakarta Selatan, Daerah Khusus Ibukota
                            Jakarta 12820
                          </address>
                        </div>
                      </div>

                      <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <form onSubmit={onCreatePasien} className="space-y-4">
                          <div>
                            <label className="sr-only" htmlFor="name">
                              Nama
                            </label>
                            <input
                              className="w-full rounded-lg form-control p-3 border-gray-400"
                              placeholder="Nama"
                              type="text"
                              id="name"
                              name="nama"
                              value={username}
                              onChange={handleChange}
                              readOnly
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <select
                                id="gender"
                                className="w-full rounded-lg form-control p-3 border-gray-400"
                                defaultValue=""
                                name="gender"
                                onChange={handleChange}
                                value={formData.gender}
                              >
                                <option disabled value="">
                                  Pilih Jenis Kelamin
                                </option>
                                <option value="laki-laki">Laki-laki</option>
                                <option value="perempuan">Perempuan</option>
                              </select>
                            </div>

                            <div>
                              <label
                                htmlFor="age"
                                className="block text-sm font-medium text-gray-700"
                              ></label>
                              <input
                                type="number"
                                id="age"
                                name="umur"
                                className="w-full rounded-lg form-control p-3 border-gray-400"
                                placeholder="Umur"
                                value={formData.umur}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div>
                            <input
                              className="w-full rounded-lg form-control p-3 border-gray-400"
                              placeholder="Nomor Telfon"
                              type="text"
                              id="telepon"
                              name="telepon"
                              value={formData.telepon}
                              onChange={handleChange}
                            />
                          </div>

                          <div>
                            <label className="sr-only" htmlFor="address">
                              Alamat
                            </label>
                            <textarea
                              className="w-full rounded-lg form-control p-3 border-gray-400"
                              placeholder="Alamat"
                              type="text"
                              id="address"
                              name="alamat"
                              rows={3}
                              value={formData.alamat}
                              onChange={handleChange}
                            ></textarea>
                          </div>

                          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                            <select
                              id="jenisPembayaran"
                              className="w-full rounded-lg form-control p-3 border-gray-400"
                              defaultValue=""
                              name="jenisPembayaran"
                              onChange={handleChange}
                              value={formData.jenisPembayaran}
                            >
                              <option disabled value="">
                                Pilih Jenis Pembayaran
                              </option>
                              <option value="tunai">Tunai</option>
                              <option value="bpjs">BPJS</option>
                            </select>
                            <div>
                              <label
                                className="sr-only"
                                htmlFor="jumlahPembayaran"
                              >
                                Jumlah Pembayaran
                              </label>
                              <input
                                className="w-full rounded-lg form-control border-gray-400 p-3"
                                placeholder="Jumlah Pembayaran"
                                type="text"
                                id="totalPembayaran"
                                value={formData.totalPembayaran}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="sr-only" htmlFor="message">
                              Pesan Keluhan
                            </label>

                            <textarea
                              className="w-full rounded-lg form-control border-gray-400 p-3"
                              placeholder="Pesan Keluhan "
                              rows="8"
                              id="message"
                              name="keluhan"
                              value={formData.keluhan}
                              onChange={handleChange}
                              required
                            ></textarea>
                          </div>

                          <div className="mt-4">
                            <button
                              type="submit"
                              className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 font-medium text-white sm:w-auto"
                            >
                              Daftar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            </>
          )}
        </div>
      </Container>

      <div className="mt-8"></div>

      <footer className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-teal-600 sm:justify-start"></div>

            <p className="mt-4 text-center text-sm text-black-500 lg:mt-0 lg:text-right">
              Copyright &copy; Mediqueue 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomeUser;
