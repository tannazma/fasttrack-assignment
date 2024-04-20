package com.airfranceklm.fasttrack.assignment.resources;

import java.util.ArrayList;
import java.util.List;

import javax.management.RuntimeErrorException;

public class HolidayRepository {

    private static List<Holiday> holidays = new ArrayList<>();

    static {
        // Adding the initial employees
        holidays.add(new Holiday(
                "uuid1234-5678-9106",
                "New Year Break",
                "klm012350",
                "2023-12-31T15:00:00+00:00",
                "2024-01-02T10:00:00+00:00",
                "SCHEDULED"));
        holidays.add(new Holiday(
                "uuid1234-5678-9101",
                "Summerholidays",
                "klm012345",
                "2022-08-02T08:00:00+00:00",
                "2022-08-16T08:00:00+00:00",
                "SCHEDULED"));
        holidays.add(new Holiday(
                "uuid1234-5678-9102",
                "Winterholidays",
                "klm012346",
                "2022-12-20T08:00:00+00:00",
                "2022-12-31T08:00:00+00:00",
                "REQUESTED"));
        holidays.add(new Holiday(
                "uuid1234-5678-9103",
                "Spring Break",
                "klm012347",
                "2023-04-05T00:00:00+00:00",
                "2023-04-12T00:00:00+00:00",
                "DRAFT"));
        holidays.add(new Holiday(
                "uuid1234-5678-9104",
                "Autumn Leave",
                "klm012348",
                "2023-10-10T00:00:00+00:00",
                "2023-10-24T00:00:00+00:00",
                "ARCHIVED"));
        holidays.add(new Holiday(
                "uuid1234-5678-9105",
                "Festival Holidays",
                "klm012349",
                "2023-07-01T08:00:00+00:00",
                "2023-07-05T08:00:00+00:00",
                "SCHEDULED"));
        holidays.add(new Holiday(
                "uuid1234-5678-9106",
                "New Year Break",
                "klm012350",
                "2023-12-31T15:00:00+00:00",
                "2024-01-02T10:00:00+00:00",
                "SCHEDULED"));
        holidays.add(new Holiday(
                "uuid1234-5678-9107",
                "Training Period",
                "klm012351",
                "2023-01-10T08:00:00+00:00",
                "2023-01-20T18:00:00+00:00",
                "REQUESTED"));
    }

    public List<Holiday> findAll() {
        return new ArrayList<>(holidays);
    }

    public Holiday add(Holiday holiday) {
        holidays.add(holiday);
        return holiday;
    }

    public boolean existsById(String holidayId) {
        return holidays.stream().anyMatch(holiday -> holiday.getHolidayId().equals(holidayId));
    }

    public void deleteById(String holidayId) {
        holidays = holidays.stream().filter(holiday -> !holiday.getHolidayId().equals(holidayId)).toList();
    }

    public void deleteHoliday(String holidayId) {
        if (existsById(holidayId)) {
            deleteById(holidayId);
        } else {
            throw new RuntimeException("Holiday not found with id: " + holidayId);
        }
    }

    public Holiday updateHoliday(String holidayId, Holiday updatedHoliday) {
        for (int i = 0; i < holidays.size(); i++) {
            Holiday holiday = holidays.get(i);
            if (holiday.getHolidayId().equals(holidayId)) {
                holidays.set(i, updatedHoliday); // Replace the old holiday with the updated one
                return updatedHoliday;
            }
        }
        throw new RuntimeException("Holiday not found with that id: " + holidayId);
    }
}
