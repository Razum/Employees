import Department from '../models/Department';

const departmentCtrl = {
  async getDepartmentEmployees(ctx) {
    const employees = await Department.query()
      .select('first_name', 'last_name', 'dept_name')
      .joinRelation('employee.employee')
      .limit(70);
    ctx.status = 200;
    ctx.body = employees;
  },
};

export default departmentCtrl;
