package com.example.demo.repository;

import com.example.demo.model.Employee;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class EmployeeRepository {
    private static final List<Employee> employees = new ArrayList<>();

    static {
        // Adding the initial employees
        employees.add(new Employee("klm012345", "John Doe"));
        employees.add(new Employee("klm012346", "Jane Smith"));
        employees.add(new Employee("klm012347", "Alice Johnson"));
        employees.add(new Employee("klm012348", "Bob Brown"));
        employees.add(new Employee("klm012349", "Carol White"));
        employees.add(new Employee("klm012350", "Dave Wilson"));
        employees.add(new Employee("klm012351", "Eva Taylor"));
        employees.add(new Employee("klm012352", "Frank Moore"));
        employees.add(new Employee("klm012353", "Gina Lopez"));
        employees.add(new Employee("klm012354", "Henry Garcia"));
    }

    public List<Employee> findAll() {
        return new ArrayList<>(employees);
    }

    public Optional<Employee> findById(String id) {
        return employees.stream()
                .filter(employee -> employee.getEmployeeId().equals(id))
                .findFirst();
    }

    public void add(Employee employee) {
        employees.add(employee);
    }
}
