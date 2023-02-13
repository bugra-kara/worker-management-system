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
import {TitleChanges} from '../models';
import {TitleChangesRepository} from '../repositories';

export class TitleChangeControllerController {
  constructor(
    @repository(TitleChangesRepository)
    public titleChangesRepository : TitleChangesRepository,
  ) {}

  @post('/title-changes')
  @response(200, {
    description: 'TitleChanges model instance',
    content: {'application/json': {schema: getModelSchemaRef(TitleChanges)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleChanges, {
            title: 'NewTitleChanges',
            exclude: ['id'],
          }),
        },
      },
    })
    titleChanges: Omit<TitleChanges, 'id'>,
  ): Promise<TitleChanges> {
    return this.titleChangesRepository.create(titleChanges);
  }

  @get('/title-changes/count')
  @response(200, {
    description: 'TitleChanges model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TitleChanges) where?: Where<TitleChanges>,
  ): Promise<Count> {
    return this.titleChangesRepository.count(where);
  }

  @get('/title-changes')
  @response(200, {
    description: 'Array of TitleChanges model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TitleChanges, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TitleChanges) filter?: Filter<TitleChanges>,
  ): Promise<TitleChanges[]> {
    return this.titleChangesRepository.find(filter);
  }

  @patch('/title-changes')
  @response(200, {
    description: 'TitleChanges PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleChanges, {partial: true}),
        },
      },
    })
    titleChanges: TitleChanges,
    @param.where(TitleChanges) where?: Where<TitleChanges>,
  ): Promise<Count> {
    return this.titleChangesRepository.updateAll(titleChanges, where);
  }

  @get('/title-changes/{id}')
  @response(200, {
    description: 'TitleChanges model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TitleChanges, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TitleChanges, {exclude: 'where'}) filter?: FilterExcludingWhere<TitleChanges>
  ): Promise<TitleChanges> {
    return this.titleChangesRepository.findById(id, filter);
  }

  @patch('/title-changes/{id}')
  @response(204, {
    description: 'TitleChanges PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TitleChanges, {partial: true}),
        },
      },
    })
    titleChanges: TitleChanges,
  ): Promise<void> {
    await this.titleChangesRepository.updateById(id, titleChanges);
  }

  @put('/title-changes/{id}')
  @response(204, {
    description: 'TitleChanges PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() titleChanges: TitleChanges,
  ): Promise<void> {
    await this.titleChangesRepository.replaceById(id, titleChanges);
  }

  @del('/title-changes/{id}')
  @response(204, {
    description: 'TitleChanges DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.titleChangesRepository.deleteById(id);
  }
}
