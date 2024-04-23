"use client";

import HolidayForm from "@/components/HolidayForm";
import Image from "next/image";

interface HolidayInterface {
  holidayLabel: string;
  startOfHoliday: string;
  endOfHoliday: string;
  status: string;
}

export default function Home() {
  const handleHolidaySubmit = (holiday: HolidayInterface) => {
    console.log("Submitting holiday:", holiday);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="mb-3 text-2xl font-semibold fixed left-50% top-0 flex w-full justify-center border-b border-blue-50 bg-gradient-to-b from-blue-100 pb-6 pt-8 backdrop-blur-2xl">
        Fast Track Assessment
      </p>
      <div className="flex pl-[100px] pt-4 w-[100%] before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial">
        <Image
          src="/holiday.jpg"
          alt="Logo"
          width={400}
          height={70}
          priority
          className="flex"
        />
        <HolidayForm onSubmit={handleHolidaySubmit} />
      </div>
      <ul>
          <p>
            By
            <a
              href="https://github.com/tannazma"
              className="font-semibold text-blue-300"
            >
              {" "}
              Tannaz
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
