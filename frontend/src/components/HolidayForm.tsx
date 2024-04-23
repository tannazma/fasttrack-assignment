import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

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
  }, [holidays]);

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
      <FormControl fullWidth margin="normal">
        <InputLabel id="holiday-label">Holiday Label</InputLabel>
        <Select
          labelId="holiday-label"
          id="holidayLabel"
          name="holidayLabel"
          value={holiday.holidayLabel}
          label="Holiday Label"
          onChange={handleChange}
          required
        >
          {holidays.map((h) => (
            <MenuItem key={h.holidayId} value={h.holidayLabel}>
              {h.holidayLabel}
            </MenuItem>
          ))}
        </Select>
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

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
      >
        Submit
      </Button>
      <Button
        type="button"
        variant="outlined"
        color="secondary"
        sx={{ mt: 1, mb: 2 }}
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
      </Button>
    </form>
  );
}

export default HolidayForm;
