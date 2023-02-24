import {
  Filter,
  FilterExcludingWhere,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TitleChanges, Worker} from '../models';
import {DepartmantsRepository, WorkerRepository, TitleChangesRepository} from '../repositories';
import { LevelSet, Salary } from '../services';

export class WorkerController {
  constructor(
    @repository(WorkerRepository)
    public workerRepository : WorkerRepository,
    @repository(DepartmantsRepository)
    public departmantsRepositry : DepartmantsRepository,
    @repository(TitleChangesRepository)
    public titleChangeRepository : TitleChangesRepository
  ) {}

  @post('/workers')
  @response(200, {
    description: 'Worker model instance',
    content: {'application/json': {schema: getModelSchemaRef(Worker)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Worker, {
            title: 'NewWorker',
            exclude: ['id'],
          }),
        },
      },
    })
    worker: Omit<Worker, 'id'>,
  ): Promise<Worker> {
    let newWorker = {...worker}
    let response =new LevelSet(worker.title, 0)
    newWorker.level = response.level
    try {
      const response = await this.workerRepository.create(newWorker);
      await this.titleChangeRepository.create({
        start_date: response.date_of_join,
        title: response.title,
        status: 1,
        user_id: response.id,
        departmant: response.departmant
      })
      return response
    } catch (error) {
      return error
    }
  }

  @get('/workers')
  @response(200, {
    description: 'Array of Worker model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Worker, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Worker) filter?: Filter<Worker>,
  ): Promise<Worker[]> {
    return this.workerRepository.find(filter);
  }

  @get('/workers/salary')
  @response(200, {
    description: 'Array of Worker model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Worker, {includeRelations: true}),
        },
      },
    },
  })
  async findSallary(
  ): Promise<Worker[]> {
    try {
      const workers = await this.workerRepository.find({
        order: ['id DESC'],
        where: { status: 1 },
        fields: {
          salary: true,
          departmant: true,
        }
      });
      const departmants = await this.departmantsRepositry.find({where: {status:1}, skip:0, order:['departmant_name ASC'], fields: {id:true,departmant_name: true,manager: false, location:false, status:false}})
      const result = new Salary(workers, departmants)
      return result.salaries
    } catch (error) {
      return error
    }
  }

  @get('/workers/{id}')
  @response(200, {
    description: 'Worker model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Worker, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Worker, {exclude: 'where'}) filter?: FilterExcludingWhere<Worker>
  ): Promise<Worker> {
    return this.workerRepository.findById(id, filter);
  }

  @get('/workers/manager/{id}')
  @response(200, {
    description: 'Manager id model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Worker, {includeRelations: true}),
      },
    },
  })
  async findManagerWorkersById(
    @param.path.number('id') id: number
  ): Promise<Worker[]> {
    return await this.workerRepository.find({where: { manager: id, id: {"neq": id}}, order:['level ASC']});
  }

  @get('/workers/change-title/{id}')
  @response(200, {
    description: 'Manager id model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Worker, {includeRelations: true}),
      },
    },
  })
  async findChangeTitleHistory(
    @param.path.number('id') id: number
  ): Promise<TitleChanges[]> {
    return this.titleChangeRepository.find({where: {user_id: id}})
  }

  @patch('/workers/{id}')
  @response(204, {
    description: 'Worker PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name', 'surname', 'email', "date_of_join", 'phone', 'salary', 'manager', 'status'],
            properties: {
              name: {
                type: "string",
              },
              surname: {
                type: "string"
              },
              email: {
                type: "string"
              },
              phone: {
                type: "string"
              },
              date_of_join: {
                type: "string"
              },
              salary: {
                type: "number"
              },
              manager: {
                type: "number"
              },
              status: {
                type: "number"
              },
            }
          },
        },
      },
    })
    worker: Worker,
  ): Promise<void> {
    await this.workerRepository.updateById(id, worker);
  }

  @patch('/workers/change-title/{id}')
  @response(204, {
    description: 'Worker PATCH success',
  })
  async updateTitle(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['date_of_join', 'old_end_date', 'departmant', 'title', 'manager'],
            properties: {
              start_date: {
                type: 'string',
              },
              old_end_date: {
                type: 'string',
              },
              title: {
                type: 'string',
              },
              departmant: {
                type: 'integer'
              },
              manager: {
                type: 'integer'
              }
            }
          }
        }
      },
    })
    worker: Worker,
  ): Promise<void> {
    try {
      let response =new LevelSet(worker.title, 0)
      await this.workerRepository.updateById(id, {title:worker.title, departmant:worker.departmant, level: response.level, manager: worker.manager});
      await this.titleChangeRepository.updateAll({end_date: worker.old_end_date},{and:[{user_id: id},{end_date: null}]})
      await this.titleChangeRepository.create({
        start_date: worker.start_date,
        title: worker.title,
        user_id: id,
        departmant: worker.departmant,
        status: 1
      })
    } catch (error) {
      response(404)
    }
  }

  @del('/workers/{id}')
  @response(204, {
    description: 'Worker DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.titleChangeRepository.deleteAll({user_id: id})
    await this.workerRepository.deleteById(id);
  }
}
