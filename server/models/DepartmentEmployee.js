import { Model } from 'objection';
import Employee from './Employee';
import Department from './Department';

class DepartmentEmployee extends Model {
  static get tableName() {
    return 'dept_emp';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      description: 'Employee to Department relation',
      required: ['emp_no', 'dept_no', 'from_date'],
      properties: {
        emp_no: {
          type: 'integer',
        },
        dept_no: {
          type: 'integer',
        },
        from_date: {
          type: 'string',
          format: 'date',
        },
        to_date: {
          type: 'string',
          format: 'date',
        },
      },
    };
  }

  static get relationMappings() {
    return {
      employee: {
        relation: Model.BelongsToOneRelation,
        modelClass: Employee,
        join: {
          from: 'dept_emp.emp_no',
          to: 'employees.emp_no',
        },
      },
      department: {
        relation: Model.BelongsToOneRelation,
        modelClass: Department,
        join: {
          from: 'dept_emp.dept_no',
          to: 'departments.dept_no',
        },
      },
    };
  }
}

export default DepartmentEmployee;
