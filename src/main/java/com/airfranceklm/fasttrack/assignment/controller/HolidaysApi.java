package com.airfranceklm.fasttrack.assignment.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.airfranceklm.fasttrack.assignment.resources.Holiday;
import com.airfranceklm.fasttrack.assignment.resources.HolidayRepository;

@Controller
@RequestMapping("/holidays")
public class HolidaysApi {

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Holiday>> getHolidays() {
        List<Holiday> holidays = new HolidayRepository().findAll();
        return new ResponseEntity<>(holidays, HttpStatus.OK);
    }

}
