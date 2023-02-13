import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {WorkerSystemDataSource} from '../datasources';
import {Departmants, DepartmantsRelations} from '../models';

export class DepartmantsRepository extends DefaultCrudRepository<
  Departmants,
  typeof Departmants.prototype.id,
  DepartmantsRelations
> {
  constructor(
    @inject('datasources.WorkerSystem') dataSource: WorkerSystemDataSource,
  ) {
    super(Departmants, dataSource);
  }
}
