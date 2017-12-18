import { Model } from 'objection';
import DepartmentEmployee from './DepartmentEmployee';

class Department extends Model {
  static get tableName() {
    return 'departments';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      description: 'Department table schema',
      required: ['dept_name'],
      properties: {
        dept_no: {
          type: 'integer',
        },
        dept_name: {
          type: 'string',
          minLength: 1,
          maxLength: 40,
        },
      },
    };
  }

  static get relationMappings() {
    return {
      employee: {
        relation: Model.HasManyRelation,
        modelClass: DepartmentEmployee,
        join: {
          from: 'departments.dept_no',
          to: 'dept_emp.dept_no',
        },
      },
    };
  }
}

export default Department;
