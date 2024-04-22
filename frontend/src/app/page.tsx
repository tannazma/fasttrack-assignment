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
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image src="/holiday.jpg" alt="Logo" width={400} height={24} priority />
      </div>
      <HolidayForm onSubmit={handleHolidaySubmit} />
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-8 left-50% flex h-48 w-full justify-center bg-gradient-to-t from-white via-white lg:static lg:size-auto lg:bg-none">
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
