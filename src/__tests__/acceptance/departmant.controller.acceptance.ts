import {Client, expect} from '@loopback/testlab';
import {WorkerManagementSystemApplication} from '../..';
import {setupApplication} from './test-helper';

describe('DepartmantsController', () => {
  let app: WorkerManagementSystemApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });
  let id: number;
  it('invokes GET /departmants', async () => {
    const response = await client.get('/departmants').expect(200);
    expect(response.body).to.have.length(4)
    expect(response.body).to.be.Array()
  });
  it('invokes POST /departmants', async () => {
    let departmantInfo = {
      departmant_name: "test",
      manager: 20,
      location: 1,
      status: 1
    }
    const response = await client.post('/departmants').send(departmantInfo).expect(200);
    id = response.body.id
    expect(response.body).to.be.Object();
  });
  it('invokes PATCH /departmants/{id}', async () => {
    let departmantNewInfo = {
      departmant_name: "test2",
      manager: 29,
      location: 3,
      status: 0
    }
    await client.patch(`/departmants/${id}`).send(departmantNewInfo).expect(204);
  });
  it('invokes GET /departmants/{id}', async () => {
    const response = await client.get(`/departmants/${id}`).expect(200);
    expect(response.body).to.be.Object();
    expect(response.body).hasOwnProperty('departmant_name').to.be.true;
  });
  it('invokes DELETE /departmants/{id}', async () => {
    await client.delete(`/departmants/${id}`).expect(204);
  });
});
