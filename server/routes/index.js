import employeeCtrl from '../controllers/Employee';
import departmentCtrl from '../controllers/Department';

const routes = (router) => {
  router.prefix('/api/v1');
  router.get('/employees', employeeCtrl.getEmployees);
  router.get('/departments/d001', departmentCtrl.getDepartmentEmployees);
};

export default routes;
