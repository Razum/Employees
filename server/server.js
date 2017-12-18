import Koa from 'koa';
import nconf from 'nconf';
import Router from 'koa-router';
import logger from 'koa-logger';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import BodyParser from 'koa-bodyparser';
import { Model } from 'objection';
import routes from './routes';
import knex from './db/knex';


const app = new Koa();
const router = new Router();

Model.knex(knex);
app.use(cors());
app.use(helmet());

app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: (err, ctx) => {
    ctx.throw('body parse error', 422);
  },
}));

if (process.env.NODE_ENV === 'development') {
  app.use(logger());
}

routes(router);

app.use(router.routes());
app.use(router.allowedMethods());

// response
app.use(async (ctx) => {
  const results = await knex.select('first_name', 'last_name', 'gender', 'dept_name')
    .from('dept_manager')
    .leftJoin('employees', 'dept_manager.emp_no', 'employees.emp_no')
    .leftJoin('departments', 'dept_manager.dept_no', 'departments.dept_no');
  ctx.body = results;
});

app.listen(nconf.get('server:port'), () => {
  console.log(`API server started on ${nconf.get('server:port')}`);
});
