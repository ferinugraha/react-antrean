import React from "react";
import "../globals.css";

function History() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Nama
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Tanggal
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Jenis Konsultasi
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Status
            </th>
            <th className="px-4 py-2">Catatan Dokter</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              John Doe
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              24/05/1995
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              Cardiology Check-up
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              Pending
            </td>
            <td className="whitespace-nowrap px-4 py-2">
              <a
                href="#"
                className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
              >
                Catatan
              </a>
            </td>
          </tr>

          <tr>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Jane Doe
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              04/11/1980
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              Dental Appointment
            </td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
              Completed
            </td>
            <td className="whitespace-nowrap px-4 py-2">
              <a
                href="#"
                className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
              >
                Catatan
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default History;
