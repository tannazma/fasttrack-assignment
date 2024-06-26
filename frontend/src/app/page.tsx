"use client";

import HolidayForm from "@/components/HolidayForm";
import { Alert } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HolidayInterface {
  holidayId: number;
  holidayLabel: string;
  startOfHoliday: string;
  endOfHoliday: string;
  status: string;
}

export default function Home() {
  const [holidays, setHolidays] = useState<HolidayInterface[]>([]);
  const [submittedHoliday, setSubmittedHoliday] = useState(null);
  const [error, setError] = useState("");
  const fetchHolidays = async () => {
    try {
      const response = await fetch("http://localhost:8080/holidays");
      const data = await response.json();
      if (response.ok) {
        setHolidays(data); // Update the holidays state with the fetched data
      } else {
        throw new Error("Failed to fetch holidays");
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  const handleHolidaySubmit = async (holiday: HolidayInterface) => {
    try {
      const response = await fetch("http://localhost:8080/holidays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(holiday),
      });
      if (response.ok) {
        const savedHoliday = await response.json();
        console.log("Holiday submitted successfully:", savedHoliday);
        fetchHolidays(); // Fetch all holidays again to update the list, including the new one
        setSubmittedHoliday(savedHoliday); // Save the newly created holiday to state
        setError("");
      } else {
        setError(await response.text());
        setSubmittedHoliday(null);
        throw new Error("Failed to submit holiday");
      }
    } catch (error) {
      console.error("Error submitting holiday:", error);
    }
    console.log("Submitting holiday:", holiday);
  };

  const parseDate = (dateStr) => new Date(dateStr);
  const sortedHolidays = holidays.sort(
    (a, b) => parseDate(a.endOfHoliday) - parseDate(b.startOfHoliday)
  );

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
      <div>
        {error && <Alert severity="error">{error}</Alert>}
        {submittedHoliday && (
          <div className="mt-4 p-4 border rounded shadow-sm bg-blue-100">
            <h3 className="text-lg font-semibold text-blue-600">
              Newly Created Holiday
            </h3>
            <p>
              <strong>Label:</strong> {submittedHoliday.holidayLabel}
            </p>
            <p>
              <strong>Start:</strong> {submittedHoliday.startOfHoliday}
            </p>
            <p>
              <strong>End:</strong> {submittedHoliday.endOfHoliday}
            </p>
            <p>
              <strong>Status:</strong> {submittedHoliday.status}
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-row flex-wrap gap-5 ">
        {sortedHolidays.map((h) => (
          <div
            key={h.holidayId}
            className="flex-col flex mt-4 p-4 border rounded shadow-sm bg-blue-50"
          >
            <h3 className="text-lg font-semibold">{h.holidayLabel}</h3>
            <p>
              <strong>Start:</strong> {h.startOfHoliday}
            </p>
            <p>
              <strong>End:</strong> {h.endOfHoliday}
            </p>
            <p>
              <strong>Status:</strong>
              {h.status}
            </p>
          </div>
        ))}
      </div>

      <footer className="bg-gradient-to-t via-white fixed bottom-0 left-0 w-full text-sm font-mono border-b border-blue-50 bg-gradient-to-blue from-blue-100 pb-6 pt-8 backdrop-blur-2xl">
        <div className="max-w-5xl mx-auto py-2 px-1 flex justify-center items-center h-full">
          <p>
            By
            <a
              href="https://github.com/tannazma"
              className="font-semibold text-blue-300 hover:text-blue-500"
            >
              {" "}
              Tannaz
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
