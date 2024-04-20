package com.airfranceklm.fasttrack.assignment.resources;

public class Employee {
    private String employeeId;
    private String name;

    // Constructor with parameters
    public Employee(String employeeId, String name) {
        this.employeeId = employeeId;
        this.name = name;
    }

    // Getters and setters
    public String getEmployeeId() {
        return employeeId;
    }
    
    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // No-argument constructor, if other parts of your application require it
    public Employee() {
    }
}
