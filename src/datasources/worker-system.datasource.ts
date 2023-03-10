import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'WorkerSystem',
  connector: 'postgresql',
  host: 'host.docker.internal', //'localhost'
  port: 5432,
  user: 'postgres',
  password: 'Workerdb1?',
  database: 'worker-system'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class WorkerSystemDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'WorkerSystem';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.WorkerSystem', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
