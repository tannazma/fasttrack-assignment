package com.airfranceklm.fasttrack.assignment.resources;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Holiday {
    private String holidayId;
    private String holidayLabel;
    private String employeeId;
    private LocalDateTime startOfHoliday;
    private LocalDateTime endOfHoliday;
    private String status;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

    public Holiday(String holidayId, String holidayLabel, String employeeId, String startOfHoliday, String endOfHoliday, String status) {
        this.holidayId = holidayId;
        this.holidayLabel = holidayLabel;
        this.employeeId = employeeId;
        this.startOfHoliday = LocalDateTime.parse(startOfHoliday, formatter);
        this.endOfHoliday = LocalDateTime.parse(endOfHoliday, formatter);
        this.status = status;
    }

    public String getHolidayId() {
        return this.holidayId;
    }

    public String getHolidayLabel() {
        return this.holidayLabel;
    }

    public String getEmployeeId() {
        return this.employeeId;
    }

    public LocalDateTime getStartOfHoliday() {
        return this.startOfHoliday;
    }

    public LocalDateTime getEndOfHoliday() {
        return this.endOfHoliday;
    }

    public String getStatus() {
        return this.status;
    }
}
