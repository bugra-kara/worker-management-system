import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {WorkerSystemDataSource} from '../datasources';
import {Offices, OfficesRelations} from '../models';

export class OfficesRepository extends DefaultCrudRepository<
  Offices,
  typeof Offices.prototype.id,
  OfficesRelations
> {
  constructor(
    @inject('datasources.WorkerSystem') dataSource: WorkerSystemDataSource,
  ) {
    super(Offices, dataSource);
  }
}
