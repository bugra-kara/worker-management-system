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
import {Offices} from '../models';
import {OfficesRepository} from '../repositories';

export class OfficesController {
  constructor(
    @repository(OfficesRepository)
    public officesRepository : OfficesRepository,
  ) {}

  @post('/offices')
  @response(200, {
    description: 'Offices model instance',
    content: {'application/json': {schema: getModelSchemaRef(Offices)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Offices, {
            title: 'NewOffices',
            exclude: ['id'],
          }),
        },
      },
    })
    offices: Omit<Offices, 'id'>,
  ): Promise<Offices> {
    return this.officesRepository.create(offices);
  }

  @get('/offices')
  @response(200, {
    description: 'Array of Offices model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Offices, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Offices) filter?: Filter<Offices>,
  ): Promise<Offices[]> {
    return this.officesRepository.find(filter);
  }

  @get('/offices/{id}')
  @response(200, {
    description: 'Offices model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Offices, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Offices, {exclude: 'where'}) filter?: FilterExcludingWhere<Offices>
  ): Promise<Offices> {
    return this.officesRepository.findById(id, filter);
  }

  @patch('/offices/{id}')
  @response(204, {
    description: 'Offices PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Offices, {partial: true}),
        },
      },
    })
    offices: Offices,
  ): Promise<void> {
    await this.officesRepository.updateById(id, offices);
  }

  @del('/offices/{id}')
  @response(204, {
    description: 'Offices DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.officesRepository.deleteById(id);
  }
}
