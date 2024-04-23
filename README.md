# FastTrack Holidays assignment

The FastTrack team is tasked with developing a new application that enables users to (re)schedule their holidays. This project aims to create a user-friendly self-service application that aligns with business rules from the labor agreement and integrates seamlessly with the flight schedule and other users' holidays.

For this initial sprint, the goal is to deliver a basic version of the application with capabilities to view, add, edit, and delete holidays.

## Overview

- Backend: Java with Spring Boot (starter boilerplate provided).
- Frontend: SPA in Next.js + React.
- API: RESTful communication between frontend and backend.

## Features

- View Holidays: Users can see an overview of all scheduled holidays.
- An interface for scheduling a new holiday, including validation against business rules.
- Delete Holiday (API only): Option to delete a pre-scheduled holiday.
- Edit Holiday (API only): Capability to modify details of an existing holiday.
- Non-Overlap Check: Prevent holiday schedule overlaps among different users.
- Working Day Gap: Enforce a minimum of 3 working days gap between consecutive holidays.
- Advance Planning: Holidays must be scheduled at least 5 working days ahead of the start date.

## System Requirements

- Backend:
  Java JDK 11 or higher
  Maven 3.6 or higher
- Frontend:
  Node.js 14 or higher
  npm 6 or higher
- IDEs: IntelliJ IDEA, Eclipse (for Java), VS Code (for JavaScript)
- Browsers: Latest versions of Chrome, Firefox, Edge

## Installation Guide

Before going through instalation, we need to make sure Software Requirements are: List the software requirements like Java, Node.js, Maven, and any specific IDEs or tools needed.
First clone repository:

```bash
$ git clone https://github.com/tannazma/fasttrack-assignment.git
```

- Backend Setup:
  Steps to set up the Java environment and run the Spring Boot application using maven commands in the root folder

```bash
$ mvn clean install
$ mvn spring-boot:run
```

The backend will start on `http://localhost:8080`.

- Frontend Setup:
  Steps to install Node.js, Next.js/React and npm using the command in folder /frontend:

```bash
$ npm install
$ npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Application Architecture

- Backend: Java Spring Boot application that provides a RESTful API to manage holiday data.
- Frontend: React application using Material-UI for styling.
- Data Storage: In-memory database managed by the backend, mimicking persistent storage.

## API Documentation

- GET `/holidays`
  Retrieves a list of all holidays.
  Response: `200 OK`, list of holiday objects.
- POST `/holidays`
  Creates a new holiday entry.
  Request Body: Holiday object.
  Response: `201 Created`, created holiday object.
- DELETE `/holidays/{holidayId}`
  Deletes a specific holiday by ID.
  Response: `204 No Content`.
- PUT `/holidays/{holidayId}`
  Updates an existing holiday.
  Request Body: Updated holiday object.
  Response: `200 OK`, updated holiday object.

## User Interface

- Home Page: Displays a list of holidays and includes a form to submit new holidays.
- Holiday Form: Allows users to input holiday details and submit them to the backend with visual feedback of successful or failed responses.
- Mock data is used within the application in the API endpoints.

## Code Examples and Snippets

- Fetching Holidays in React:

```bash
useEffect(() => {
  async function fetchHolidays() {
    const response = await fetch('http://localhost:8080/holidays');
    const data = await response.json();
    setHolidays(data);
  }
  fetchHolidays();
}, []);
```

- Submitting a Holiday in React:

```bash
const handleHolidaySubmit = async (holiday) => {
  const response = await fetch('http://localhost:8080/holidays', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(holiday),
  });
  const savedHoliday = await response.json();
  setSubmittedHoliday(savedHoliday);
};
```

- Spring Boot Method to Add Holiday:

```bash
@RequestMapping(method = RequestMethod.POST)
public ResponseEntity<?> addHoliday(@RequestBody Holiday holiday) {
  holiday.generateHolidayId();
  Holiday savedHoliday = new HolidayRepository().add(holiday);
  return new ResponseEntity<>(savedHoliday, HttpStatus.CREATED);
}
```

- Dates overlap logic:

```bash
private boolean datesOverlap(LocalDateTime start1, LocalDateTime end1, LocalDateTime start2, LocalDateTime end2) {
   boolean holiday1StartsAfterHoliday2 = start1.isAfter(end2);
   boolean holiday2StartsAfterHoliday1 = start2.isAfter(end1);
   boolean holiday1IsAtLeast3DaysAfterHoliday2 = hasAtleast3DaysGap(end2, start1);
   boolean holiday2IsAtLeast3DaysAfterHoliday1 = hasAtleast3DaysGap(end1, start2);

   boolean valid = (holiday1StartsAfterHoliday2 || holiday2StartsAfterHoliday1)
     && (holiday1IsAtLeast3DaysAfterHoliday2 || holiday2IsAtLeast3DaysAfterHoliday1);
   boolean overlap = !valid;
   return overlap;
}
```

## Challenges

- Understanding how to run Spring Boot and Java on my Mac for the first time was indeed the most challenging part.
- It was my first time using Java or even Spring Boot, so unfortunately, the project is not completed, but I learned how to work with Spring Boot to create APIs.
- Implementing the logic, especially for non-overlapping holidays, was the most logically challenging part for me, after Java, of course. :)
- Based on the easy-to-use MUI API, I utilized MUI components instead of styling solely with Tailwind CSS.

## Future Plans

- There are a few features I need to improve, especially in the frontend, such as implementing edit and delete functionalities for holidays.
- I also plan to enhance the design and implement a UI for employees (or perhaps enable login with their name and employee ID) to access their individual dashboards and create their own holidays.
- I would love to work on the calendar view of the holidays, where users can click on a date in the calendar to create a holiday leave.
- I will definitely work more on the backend, particularly in creating APIs for employees to interact with.