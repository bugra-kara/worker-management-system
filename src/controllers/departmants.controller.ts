import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
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
import {Departmants} from '../models';
import {DepartmantsRepository} from '../repositories';

export class DepartmantsController {
  constructor(
    @repository(DepartmantsRepository)
    public departmantsRepository : DepartmantsRepository,
  ) {}

  @post('/departmants')
  @response(200, {
    description: 'Departmants model instance',
    content: {'application/json': {schema: getModelSchemaRef(Departmants)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departmants, {
            title: 'NewDepartmants',
            exclude: ['id'],
          }),
        },
      },
    })
    departmants: Omit<Departmants, 'id'>,
  ): Promise<Departmants> {
    return this.departmantsRepository.create(departmants);
  }

  @get('/departmants')
  @response(200, {
    description: 'Array of Departmants model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Departmants, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Departmants) filter?: Filter<Departmants>,
  ): Promise<Departmants[]> {
    return this.departmantsRepository.find(filter);
  }

  @get('/departmants/{id}')
  @response(200, {
    description: 'Departmants model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Departmants, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Departmants, {exclude: 'where'}) filter?: FilterExcludingWhere<Departmants>
  ): Promise<Departmants> {
    return this.departmantsRepository.findById(id, filter);
  }

  @patch('/departmants/{id}')
  @response(204, {
    description: 'Departmants PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departmants, {partial: true}),
        },
      },
    })
    departmants: Departmants,
  ): Promise<void> {
    await this.departmantsRepository.updateById(id, departmants);
  }

  @del('/departmants/{id}')
  @response(204, {
    description: 'Departmants DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.departmantsRepository.deleteById(id);
  }
}
