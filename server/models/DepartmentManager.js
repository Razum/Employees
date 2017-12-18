import { Model } from 'objection';
import Employee from './Employee';

class DepartmentManager extends Model {
  static get tableName() {
    return 'dept_manager';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      description: 'Department managers',
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
          from: 'dept_manager.emp_no',
          to: 'employees.emp_no',
        },
      },
    };
  }
}

export default DepartmentManager;
