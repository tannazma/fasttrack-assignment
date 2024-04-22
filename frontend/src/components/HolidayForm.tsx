import React, { useEffect, useState } from "react";

interface HolidayInterface {
  holidayId: number;
  holidayLabel: string;
  startOfHoliday: string;
  endOfHoliday: string;
  status: string;
}

interface Props {
  onSubmit: (holiday: HolidayInterface) => void;
  existingHoliday?: HolidayInterface;
}

function HolidayForm({ onSubmit, existingHoliday }: Props) {
  const [holidays, setHolidays] = useState<HolidayInterface[]>([]);
  const [holiday, setHoliday] = useState<HolidayInterface>({
    holidayLabel: existingHoliday ? existingHoliday.holidayLabel : "",
    startOfHoliday: existingHoliday ? existingHoliday.startOfHoliday : "",
    endOfHoliday: existingHoliday ? existingHoliday.endOfHoliday : "",
    holidayId: existingHoliday ? existingHoliday.holidayId : 0,
    status: existingHoliday ? existingHoliday.status : "DRAFT",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/holidays");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: HolidayInterface[] = await response.json();
        console.log(data);
        setHolidays(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setHoliday((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setHoliday((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(holiday);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="holidayLabel">
        Holiday Label:
        <select
          name="holidayLabel"
          value={holiday.holidayLabel}
          onChange={handleChange}
          required
        >
          {holidays.map((h) => (
            <option key={h.holidayId} value={h.holidayLabel}>
              {h.holidayLabel}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="startOfHoliday">
        Start Date:
        <input
          type="datetime-local"
          id="startOfHoliday"
          name="startOfHoliday"
          value={holiday.startOfHoliday}
          onChange={handleChangeInput}
          required
        />
      </label>

      <label htmlFor="endOfHoliday">End Date:</label>
      <input
        type="datetime-local"
        id="endOfHoliday"
        name="endOfHoliday"
        value={holiday.endOfHoliday}
        onChange={handleChangeInput}
        required
      />

      <button type="submit">Submit</button>
      <button
        type="button"
        onClick={() =>
          setHoliday({
            holidayLabel: "",
            startOfHoliday: "",
            endOfHoliday: "",
            status: "DRAFT",
            holidayId: 0,
          })
        }
      >
        Cancel
      </button>
    </form>
  );
}

export default HolidayForm;
