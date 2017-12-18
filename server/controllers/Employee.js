import Employee from '../models/Employee';

const employeeCtrl = {
  async getEmployees(ctx) {
    const employees = await Employee
      .getEmployeesLatestInfo()
      .limit(10);

    ctx.status = 200;
    ctx.body = employees;
  },
};

export default employeeCtrl;
