import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  SelectChangeEvent,
} from "@mui/material";

interface HolidayInterface {
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
    status: existingHoliday ? existingHoliday.status : "DRAFT",
  });

  useEffect(() => {
    async function getHolidays() {
      try {
        const response = await fetch("http://localhost:8080/holidays");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setHolidays(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
    getHolidays();
  }, []);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setHoliday((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(holiday);
  };

  return (
    <div className="flex pt-4 w-[100%] before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
      <form onSubmit={handleSubmit} className="z-[1] relative">
        <FormControl fullWidth margin="normal">
          <TextField
            id="holidayLabel"
            name="holidayLabel"
            value={holiday.holidayLabel}
            label="Holiday Label"
            onChange={handleChangeInput}
            required
          ></TextField>
        </FormControl>

        <TextField
          margin="normal"
          fullWidth
          id="startOfHoliday"
          name="startOfHoliday"
          label="Start Date"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          value={holiday.startOfHoliday}
          onChange={handleChangeInput}
          required
        />

        <TextField
          margin="normal"
          fullWidth
          id="endOfHoliday"
          name="endOfHoliday"
          label="End Date"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          value={holiday.endOfHoliday}
          onChange={handleChangeInput}
          required
        />
        <div className="flex gap-8">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={() =>
              setHoliday({
                holidayLabel: "",
                startOfHoliday: "",
                endOfHoliday: "",
                status: "DRAFT",
              })
            }
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default HolidayForm;
