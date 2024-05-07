import React, { useState } from "react";
// import FormRegistrasi from "../../../app/_components/FormRegistrasi";

function AntreanPage() {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [jumlahPembayaran, setJumlahPembayaran] = useState("");
  const handleJumlahPembayaranChange = (event) => {
    setJumlahPembayaran(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "jenisPembayaran") {
      const totalPembayaran = value === "bpjs" ? "0" : "100000";
      setFormData((prevData) => ({
        ...prevData,
        jenisPembayaran: value,
        totalPembayaran,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [formData, setFormData] = useState({
    nama: "",
    notelp: "",
    jenisKelamin: "",
    umur: "",
    alamat: "",
    keluhan: "",
    jenisPembayaran: "",
    totalPembayaran: "0",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <p className="max-w-xl text-lg">
              Daftarkan diri Anda sekarang untuk mendapatkan nomor antrean.
              Dengan mendaftar, Anda dapat memilih cara pembayaran dan
              memberikan pesan atau keluhan jika diperlukan
            </p>

            <div className="mt-8">
              <a href="#" className="text-2xl font-bold text-blue-500">
                {" "}
                021 1000 200{" "}
              </a>

              <address className="mt-2 not-italic">
                Jl. Tebet Timur Dalam IX No.2, Tebet Tim., Kec. Tebet, Kota
                Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12820
              </address>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  value={formData.nama}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="gender" className="sr-only">
                    Jenis Kelamin
                  </label>
                  <select
                    id="gender"
                    className="w-full rounded-lg form-control p-3 border-gray-400"
                    defaultValue=""
                    style={{
                      color:
                        formData.jenisKelamin === "" ? "#616161" : "#00000",
                    }}
                    name="jenisKelamin"
                    onChange={handleChange}
                    value={formData.jenisKelamin}
                  >
                    <option disabled value="">
                      Pilih Jenis Kelamin
                    </option>
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
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

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full rounded-lg form-control p-3 border-gray-400"
                    placeholder="Alamat Email"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="phone">
                    Nomor Telfon
                  </label>
                  <input
                    className="w-full rounded-lg form-control p-3 border-gray-400"
                    placeholder="Nomor Telfon"
                    type="tel"
                    id="phone"
                    name="notelp"
                    value={formData.notelp}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="address">
                  Alamat
                </label>
                <input
                  className="w-full rounded-lg form-control p-3 border-gray-400"
                  placeholder="Alamat"
                  type="text"
                  id="address"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="Option1"
                    className="block w-full cursor-pointer rounded-lg form-control border-gray-400 p-3 text-gray-600 hover:border-blue-500 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
                    tabIndex="0"
                  >
                    <input
                      className="sr-only"
                      id="Option1"
                      type="radio"
                      tabIndex="-1"
                      name="option"
                      onChange={() => setSelectedPaymentOption("bayarSendiri")}
                    />

                    <span className="text-sm"> Bayar Sendiri </span>
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="Option2"
                    className="block w-full cursor-pointer rounded-lg form-control border-gray-400 p-3 text-gray-600  hover:border-blue-500 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white"
                    tabIndex="0"
                  >
                    <input
                      className="sr-only"
                      id="Option2"
                      type="radio"
                      tabIndex="-1"
                      name="option"
                      onChange={() => setSelectedPaymentOption("bpjs")}
                    />

                    <span className="text-sm"> BPJS </span>
                  </label>
                </div>
              </div>

              <div>
                {selectedPaymentOption === "bayarSendiri" && (
                  <div>
                    <label className="sr-only" htmlFor="jumlahPembayaran">
                      Jumlah Pembayaran
                    </label>
                    <input
                      className="w-full rounded-lg form-control border-gray-400 p-3"
                      placeholder="Jumlah Pembayaran"
                      type="text"
                      id="jumlahPembayaran"
                      value={jumlahPembayaran}
                      onChange={handleJumlahPembayaranChange}
                    />
                  </div>
                )}
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
  );
}

export default AntreanPage;
