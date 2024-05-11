import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../../../app/globals.css";

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

  const namaStaff = "Mr. White";

  return (
    <>
      <Container className="mt-2">
        <div className="lg:py-8">
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-primary">Selamat Datang Kembali,</span>
            <div className="mt-2">
              <span className="text-black" style={{ fontSize: "64px" }}>
                {" "}
                {namaStaff}!
              </span>
            </div>
          </h2>
          <p className="mt-4 text-gray-600">
            Berikut daftar antrean untuk memproses layanan pelanggan.
          </p>
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
                      Sisa Antrean
                    </h1>
                    <h3 className="mt-0.5 text-xl font-medium text-gray-900 text-center">
                      {sisaAntrean}
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
                      {antreanKeBerapa}
                    </h3>
                  </a>
                </div>
              </article>
            </Col>
          </div>
        </Container>
      </div>

      <Container className="mt-4">
        <div className="rounded-lg border custom-border">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 border-gray-500 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    No.
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Nama
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {antreanMenunggu.map((item) => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      {item.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {item.nama}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {item.status}
                    </td>
                    <td className="px-4 py-2 text-center">
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
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      {item.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {item.nama}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      {item.status}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {item.status === "Diproses" && (
                        <Button onClick={() => finishAntrean(item.id)}>
                          Selesai
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
}

export default HomeStaff;

// import React, { useEffect, useState } from "react";
// import { Button, Col, Container, Row } from "react-bootstrap";
// import "../../../app/globals.css";

// function HomeStaff() {
//   const [antreanData, setAntreanData] = useState([]);

//   const [sisaAntrean, setSisaAntrean] = useState(100);
//   const [antreanKeBerapa, setAntreanKeBerapa] = useState(0);

//   const fetchPasien = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/pasien/list");
//       if (!response.data) {
//         throw new Error("Failed to fetch data");
//       }

//       const sortedData = response.data.sort((a, b) => {
//         if (a.status === "Diproses" && b.status !== "Diproses") {
//           return -1;
//         } else if (a.status !== "Diproses" && b.status === "Diproses") {
//           return 1;
//         } else {
//           return 0;
//         }
//       });

//       console.log(sortedData);
//       setAntreanData(sortedData);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchPasien();

//     const interval = setInterval(() => {
//       console.log("Reloading data...");
//       fetchPasien();
//     }, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   const updateStatus = async (_id) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:3000/pasien/update/${_id}`,
//         { status: "Diproses" }
//       );
//       console.log(response.data);
//       const updatedData = antreanData.map((item) =>
//         item._id === _id ? { ...item, status: "Diproses" } : item
//       );
//       setAntreanData(updatedData);
//       setSisaAntrean((prev) => prev - 1);
//       setAntreanKeBerapa((prev) => prev + 1);
//       alert("Status antrean berhasil diubah!");
//     } catch (error) {
//       console.error(error.message);
//       alert(
//         "Terjadi kesalahan saat memperbarui status antrean. Silakan coba lagi."
//       );
//     }
//   };

//   const antreanMenunggu = antreanData.filter(
//     (item) => item.status === "Menunggu"
//   );
//   const antreanDiproses = antreanData.filter(
//     (item) => item.status === "Diproses"
//   );

//   return (
//     <>
//       {/* <Container className="mt-2">
//         <div className="lg:py-8">
//           <h2 className="text-3xl font-bold sm:text-4xl">
//             <span className="text-primary">Selamat Datang</span> kembali,
//             <div className="mt-2">
//               <span className="text-primary" style={{ fontSize: "64px" }}>
//                 {" "}
//                 {}!
//               </span>
//             </div>
//           </h2>
//           <p className="mt-4 text-gray-600">
//             Berikut daftar antrean untuk memproses layanan pelanggan.
//           </p>
//         </div>
//       </Container> */}

//       <div>
//         <Container className="mt-2">
//           <div className="d-flex justify-content-between mb-4 mt-4">
//             <Col md={5}>
//               <article className="hover:animate-background relative block overflow-hidden rounded-xl border border-gray-100 p-0.5 shadow-md transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
//                 <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500"></span>
//                 <div className="rounded-[8px] bg-white p-4 !pt-8 sm:p-20">
//                   <a>
//                     <h1 className="mt-0.5 text-xl font-medium text-gray-900 text-center">
//                       Sisa Antrean
//                     </h1>
//                     <h3 className="mt-0.5 text-xl font-medium text-gray-900 text-center">
//                       {sisaAntrean}
//                     </h3>
//                   </a>
//                 </div>
//               </article>
//             </Col>
//             <Col md={2}></Col>
//             <Col md={5}>
//               <article className="hover:animate-background relative block overflow-hidden rounded-xl border border-gray-100 p-0.5 shadow-md transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
//                 <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500"></span>
//                 <div className="rounded-[8px] bg-white p-4 !pt-8 sm:p-20">
//                   <a>
//                     <h1 className="mt-0.5 text-xl font-medium text-gray-900 text-center">
//                       Antrean Ke Berapa
//                     </h1>
//                     <h3 className="mt-0.5 text-xl font-medium text-gray-900 text-center">
//                       {antreanKeBerapa}
//                     </h3>
//                   </a>
//                 </div>
//               </article>
//             </Col>
//           </div>
//         </Container>
//       </div>

//       <Container className="mt-4">
//         <div className="rounded-lg border custom-border">
//           <div className="overflow-x-auto rounded-t-lg">
//             <table className="min-w-full divide-y-2 border-gray-500 divide-gray-200 bg-white text-sm">
//               <thead className="ltr:text-left rtl:text-right">
//                 <tr>
//                   <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
//                     No.
//                   </th>
//                   <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
//                     Nama
//                   </th>
//                   <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
//                     Status
//                   </th>
//                   <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
//                     Aksi
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-200">
//                 {antreanMenunggu.map((item, index) => (
//                   <tr key={antreanDiproses.length + index + 1}>
//                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
//                       {antreanDiproses.length + index + 1}
//                     </td>
//                     <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
//                       {item.nama}
//                     </td>
//                     <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
//                       {item.status}
//                     </td>
//                     <td className="px-4 py-2 text-center">
//                       {item.status === "Menunggu" && (
//                         <Button onClick={() => updateStatus(item._id)}>
//                           Proses
//                         </Button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//                 {antreanDiproses.map((item, index) => (
//                   <tr key={antreanDiproses.length + index + 1}>
//                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//                       {antreanDiproses.length + index + 1}
//                     </td>
//                     <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//                       {item.nama}
//                     </td>
//                     <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//                       {item.status}
//                     </td>
//                     <td className="px-4 py-2">
//                       {item.status === "Diproses" && (
//                         <Button onClick={() => updateStatus(item._id)}>
//                           Selesai
//                         </Button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// }

// export default HomeStaff;
