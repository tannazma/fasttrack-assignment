package com.airfranceklm.fasttrack.assignment.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.airfranceklm.fasttrack.assignment.resources.Holiday;
import com.airfranceklm.fasttrack.assignment.resources.HolidayRepository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequestMapping("/holidays")
public class HolidaysApi {

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Holiday>> getHolidays() {
        List<Holiday> holidays = new HolidayRepository().findAll();
        return new ResponseEntity<>(holidays, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Holiday> addHoliday(@RequestBody Holiday holiday) {
        Holiday savedHoliday = new HolidayRepository().add(holiday);
        return new ResponseEntity<>(savedHoliday, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{holidayId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteHoliday(@PathVariable String holidayId) {
        if (!new HolidayRepository().existsById(holidayId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        new HolidayRepository().deleteById(holidayId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Correct HTTP status for a successful deletion
    }

    @RequestMapping(value = "/{holidayId}", method = RequestMethod.PUT)
    public ResponseEntity<Holiday> updateHoliday(@PathVariable String holidayId, @RequestBody Holiday holiday) {
        try {
            if (!new HolidayRepository().existsById(holidayId)) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            Holiday updatedHoliday = new HolidayRepository().updateHoliday(holidayId, holiday);
            return new ResponseEntity<>(updatedHoliday, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
