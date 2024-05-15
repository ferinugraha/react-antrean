import React from "react";
import "../globals.css";
import { Image } from "react-bootstrap";
import { Button } from "../../src/components/ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <Image
                alt=""
                src="/dokter.hd.jpg"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="lg:py-24">
              <h2 className="text-3xl font-bold sm:text-4xl">
                <span className="text-primary">Selamat Datang</span> di Aplikasi
                <span className="text-primary"> Antrean </span> Rumah Sakit
              </h2>

              <p className="mt-4 text-gray-600">
                Dengan aplikasi kami, Anda dapat mengatur antrean secara online
                dan menghindari waktu tunggu yang panjang di rumah sakit.
              </p>

              <Link to="/registrasi">
                <Button className="mt-8">Daftar Sekarang</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
