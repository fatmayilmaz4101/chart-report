CREATE OR REPLACE FUNCTION GetEmployeeDepartmentData()
RETURNS TABLE(
    emp_id integer,
    emp_first_name character varying(50),
    emp_last_name character varying(50),
    dept_name character varying(100),
    emp_hire_date date,
    emp_salary numeric(10,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ev.employee_id AS emp_id, 
        ev.first_name AS emp_first_name, 
        ev.last_name AS emp_last_name, 
        ev.department_name AS dept_name, 
        ev.hire_date AS emp_hire_date, 
        ev.salary AS emp_salary
    FROM 
        employee_department_view ev;
END;
$$ LANGUAGE plpgsql;


SELECT * FROM GetEmployeeDepartmentData()
