import { Model } from 'objection';
import Salary from './Salary';
import Title from './Title';
import DepartmentManager from './DepartmentManager';
import Department from './Department';
import DepartmentEmployee from './DepartmentEmployee';

class Employee extends Model {
  static get tableName() {
    return 'employees';
  }

  static getEmployeeLatestSalary() {
    const latestSalaryDate = Salary.query()
      .select('emp_no')
      .max('from_date AS latest_salary_date')
      .groupBy('emp_no')
      .as('latest_date');

    return Salary.query()
      .select('salaries.emp_no AS emp_no', 'salaries.salary AS salary')
      .innerJoin(latestSalaryDate, function () {
        this
          .on('salaries.emp_no', '=', 'latest_date.emp_no')
          .andOn('salaries.from_date', '=', 'latest_date.latest_salary_date');
      });
  }

  static getEmployeeLatestTitle() {
    const latestTitleDate = Title.query()
      .select('emp_no')
      .max('from_date AS latest_title_date')
      .groupBy('emp_no')
      .as('latest_date');

    return Title.query()
      .select('titles.emp_no AS emp_no', 'titles.title AS title')
      .innerJoin(latestTitleDate, function () {
        this
          .on('titles.emp_no', '=', 'latest_date.emp_no')
          .andOn('titles.from_date', '=', 'latest_date.latest_title_date');
      });
  }

  static getEmployeeLatestDepartment() {
    const latestDepartmentDate = DepartmentEmployee.query()
      .select('emp_no')
      .max('from_date AS latest_department_date')
      .groupBy('emp_no')
      .as('latest_date');

    const latestEmployeeDepartment = DepartmentEmployee.query()
      .select('dept_emp.emp_no', 'dept_emp.dept_no')
      .innerJoin(latestDepartmentDate, function () {
        this
          .on('dept_emp.emp_no', '=', 'latest_date.emp_no')
          .andOn('dept_emp.from_date', '=', 'latest_date.latest_department_date');
      })
      .as('latest_department');

    return Department.query().select('emp_no', 'dept_name')
      .rightJoin(latestEmployeeDepartment, 'departments.dept_no', '=', 'latest_department.dept_no');
  }

  static getEmployeesLatestInfo() {
    return Employee.query()
      .select('employees.emp_no as emp_no', 'first_name', 'last_name', 'title', 'salary', 'dept_name')
      .innerJoin(Employee.getEmployeeLatestSalary().as('latest_salaries'), 'employees.emp_no', '=', 'latest_salaries.emp_no')
      .innerJoin(Employee.getEmployeeLatestTitle().as('latest_titles'), 'employees.emp_no', '=', 'latest_titles.emp_no')
      .innerJoin(Employee.getEmployeeLatestDepartment().as('latest_departments'), 'employees.emp_no', '=', 'latest_departments.emp_no')
  }

  static get jsonSchema() {
    return {
      type: 'object',
      description: 'Employee table schema',
      required: ['birth_date', 'first_name', 'last_name', 'gender', 'hire_date'],
      properties: {
        emp_no: {
          type: 'integer',
        },
        birth_date: {
          type: 'string',
          format: 'date',
        },
        first_name: {
          type: 'string',
          minLength: 1,
          maxLength: 14,
        },
        last_name: {
          type: 'string',
          minLength: 1,
          maxLength: 16,
        },
        gender: {
          type: 'string',
          enum: ['M', 'F'],
        },
        hire_date: {
          type: 'string',
          format: 'date',
        },
      },
    };
  }

  static get relationMappings() {
    return {
      salary: {
        relation: Model.HasManyRelation,
        modelClass: Salary,
        join: {
          from: 'employees.emp_no',
          to: 'salaries.emp_no',
        },
      },
      title: {
        relation: Model.HasManyRelation,
        modelClass: Title,
        join: {
          from: 'employees.emp_no',
          to: 'titles.emp_no',
        },
      },
      manager: {
        relation: Model.HasOneRelation,
        modelClass: DepartmentManager,
        join: {
          from: 'employees.emp_no',
          to: 'dept_manager.emp_no',
        },
      },
      department: {
        relation: Model.HasManyRelation,
        modelClass: DepartmentEmployee,
        join: {
          from: 'employees.emp_no',
          to: 'dept_emp.emp_no',
        },
      },
    };
  }
}

export default Employee;
