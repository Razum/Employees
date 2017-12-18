import { Model } from 'objection';
import Employee from './Employee';

class Salary extends Model {
  static get tableName() {
    return 'salaries';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      description: 'Employees salaries',
      required: ['emp_no', 'salary', 'from_date'],
      properties: {
        emp_no: {
          type: 'integer',
        },
        salary: {
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
          from: 'salaries.emp_no',
          to: 'employees.emp_no',
        },
      },
    };
  }
}

export default Salary;
