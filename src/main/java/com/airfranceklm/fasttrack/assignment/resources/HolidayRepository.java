package com.airfranceklm.fasttrack.assignment.resources;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    private boolean isWorkingDay(LocalDateTime date) {
        return date.getDayOfWeek() != DayOfWeek.SATURDAY && date.getDayOfWeek() != DayOfWeek.SUNDAY;
    }

    private int countWorkingDays(LocalDateTime start, LocalDateTime end) {
        int workingDays = 0;
        for (LocalDateTime date = start; date.isBefore(end); date = date.plusDays(1)) {
            if (isWorkingDay(date)) {
                workingDays++;
            }
        }
        return workingDays;
    }

    private boolean hasAtleast3DaysGap(LocalDateTime end1, LocalDateTime start2) {
        boolean holiday2StartsAtleast3DaysAfterHoliday1Ends = countWorkingDays(end1.plusDays(1), start2) >= 3;

        return holiday2StartsAtleast3DaysAfterHoliday1Ends;
    }

    private boolean isPlannedInAdvance(LocalDateTime startHolidayDate) {
        LocalDateTime today = LocalDateTime.now(); // This represents the current time, ideally injected for testability
        System.out.println("Today's Date: " + today);
        System.out.println(countWorkingDays(today, startHolidayDate));
        return countWorkingDays(today, startHolidayDate) >= 5;
    }

    private boolean datesOverlap(LocalDateTime start1, LocalDateTime end1, LocalDateTime start2, LocalDateTime end2) {
        System.out.println(
                "Comparing Dates: Start1: " + start1 + ", End1: " + end1 + ", Start2: " + start2 + ", End2: " + end2);

        boolean holiday1StartsAfterHoliday2 = start1.isAfter(end2);
        boolean holiday2StartsAfterHoliday1 = start2.isAfter(end1);
        boolean holiday1IsAtLeast3DaysAfterHoliday2 = hasAtleast3DaysGap(end2, start1);
        boolean holiday2IsAtLeast3DaysAfterHoliday1 = hasAtleast3DaysGap(end1, start2);

        boolean valid = (holiday1StartsAfterHoliday2 || holiday2StartsAfterHoliday1)
                && (holiday1IsAtLeast3DaysAfterHoliday2 || holiday2IsAtLeast3DaysAfterHoliday1);

        boolean overlap = !valid;

        System.out.println("checking overlaps - holiday1: " + start1 + end1 + " - holiday2: " + start2 + end2 +
                " - holiday1IsAtLeast3DaysAfterHoliday2:" + holiday1IsAtLeast3DaysAfterHoliday2 +
                " - holiday2IsAtLeast3DaysAfterHoliday1: " + holiday2IsAtLeast3DaysAfterHoliday1);

        return overlap;
    }

    public Holiday add(Holiday holiday) throws RuntimeException {
        System.out.println("Holiday Start Date: " + holiday.getStartOfHoliday());

        if (!isPlannedInAdvance(holiday.getStartOfHoliday())) {
            throw new RuntimeException("Holiday must be planned at least 5 working days before the start date.");
        }
        for (Holiday existingHoliday : holidays) {
            if (datesOverlap(existingHoliday.getStartOfHoliday(), existingHoliday.getEndOfHoliday(),
                    holiday.getStartOfHoliday(),
                    holiday.getEndOfHoliday())) {
                throw new RuntimeException("Holiday overlaps with an existing holiday.");
            }
        }
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
        if (!isPlannedInAdvance(updatedHoliday.getStartOfHoliday())) {
            throw new RuntimeException(
                    "Updated holiday must be planned at least 5 working days before the start date.");
        }
        for (int i = 0; i < holidays.size(); i++) {
            Holiday holiday = holidays.get(i);
            if (holiday.getHolidayId().equals(holidayId)) {
                if (!holiday.getHolidayId().equals(holidayId)
                        && datesOverlap(holiday.getStartOfHoliday(), holiday.getEndOfHoliday(),
                                updatedHoliday.getStartOfHoliday(), updatedHoliday.getEndOfHoliday())) {
                    throw new RuntimeException("Updated holiday overlaps with another holiday.");
                }
                holidays.set(i, updatedHoliday); // Replace the old holiday with the updated one
                return updatedHoliday;
            }
        }
        throw new RuntimeException("Holiday not found with that id: " + holidayId);
    }
}
