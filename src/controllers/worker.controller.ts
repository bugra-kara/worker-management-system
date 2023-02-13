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
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Worker} from '../models';
import {DepartmantsRepository, WorkerRepository} from '../repositories';

export class WorkerController {
  constructor(
    @repository(WorkerRepository)
    public workerRepository : WorkerRepository,
    @repository(DepartmantsRepository)
    public departmantsRepositry : DepartmantsRepository,
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
    if(worker.title === 'Budget/Accounting Analyst' || worker.title === "Graphic Designer" || worker.title === "Quality Control Specialist" || worker.title === 'Software Developer') {
      newWorker.level = 3
    }
    if(worker.title === 'Chief Graphic Designer' || worker.title === "Quality Control Manager" || worker.title === "Budget/Accounting Manager" || worker.title === 'Lead Software Developer') {
      newWorker.level = 2
    }
    if(worker.title === 'Founder' || worker.title === 'Co-Founder') {
      newWorker.level = 1
    }
    return this.workerRepository.create(newWorker);
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
      const response = await this.workerRepository.find({
        offset: 0,
        limit: 100,
        skip: 0,
        order: ['id DESC'],
        where: { status: 1 },
        fields: {
          id: false,
          name: false,
          surname: false,
          email: false,
          phone: false,
          date_of_join: false,
          salary: true,
          departmant: true,
          title: false,
          manager: false,
          status: false,
          level: false
        }
      })
      let newMap = new Map<any,any>()
      let result = new Array()
      response.map((item,index)=> {
        if(newMap.has(item.departmant)&&index !== 0){
          newMap.forEach((value,key)=>{if(key === item.departmant){newMap.set(key, {salary:((value.salary*value.count) + item.salary)/(value.count+1), count:value.count+1})}})
        }
        else {
          newMap.set(item.departmant, {salary:item.salary, count:1})
        }
      return item})
      const departmants = await this.departmantsRepositry.find({where: {status:1}, skip:0, order:['departmant_name ASC'], fields: {id:true,departmant_name: true,manager: false, location:false, status:false}})
      departmants.map((item)=>{
        newMap.forEach((value,key)=>{if(item.id === key){result!.push({departmant_name:item.departmant_name, avg_salary:value.salary})}})
      });
      return result
    } catch (error) {
      console.log(error);
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

  @patch('/workers/{id}')
  @response(204, {
    description: 'Worker PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Worker, {partial: true}),
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
            required: ['date_of_join','end_date','departmant','title'],
            properties: {
              start_date: {
                type: 'string',
              },
              end_date: {
                type: 'string',
              },
              title: {
                type: 'string',
              },
              departmant: {
                type: 'integer'
              }
            }
          }
        }
      },
    })
    worker: Worker,
  ): Promise<void> {
    await this.workerRepository.updateById(id, worker);
  }

  @del('/workers/{id}')
  @response(204, {
    description: 'Worker DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.workerRepository.deleteById(id);
  }
}
