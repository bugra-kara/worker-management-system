import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {WorkerSystemDataSource} from '../datasources';
import {TitleChanges, TitleChangesRelations} from '../models';

export class TitleChangesRepository extends DefaultCrudRepository<
  TitleChanges,
  typeof TitleChanges.prototype.id,
  TitleChangesRelations
> {
  constructor(
    @inject('datasources.WorkerSystem') dataSource: WorkerSystemDataSource,
  ) {
    super(TitleChanges, dataSource);
  }
}
