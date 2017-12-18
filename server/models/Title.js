import { Model } from 'objection';
import Employee from './Employee';

class Title extends Model {
  static get tableName() {
    return 'titles';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      description: 'Employee position titles',
      required: ['emp_no', 'title', 'from_date'],
      properties: {
        emp_no: {
          type: 'integer',
        },
        title: {
          type: 'string',
          minLength: 1,
          maxLength: 50,
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
          from: 'titles.emp_no',
          to: 'employees.emp_no',
        },
      },
    };
  }
}

export default Title;
