import {Client, expect} from '@loopback/testlab';
import {WorkerManagementSystemApplication} from '../..';
import {setupApplication} from './test-helper';

describe('OfficesController', () => {
  let app: WorkerManagementSystemApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });
  let id: number;
  it('invokes GET /offices', async () => {
    const response = await client.get('/offices').expect(200);
    expect(response.body).to.have.length(3)
    expect(response.body).to.be.Array()
  });
  it('invokes POST /offices', async () => {
    let officeInfo = {
     location: "test",
     address: "test1",
     p_code: 1321,
     country: "test2",
     city: "test3",
     status: 1
    }
    const response = await client.post('/offices').send(officeInfo).expect(200)
    id = response.body.id
    expect(response.body).to.be.Object();
  });
  it('invokes PATCH /offices/{id}', async () => {
   let officeNewInfo = {
    location: "test1",
    address: "test2",
    p_code: 1321,
    country: "test3",
    city: "test4",
    status: 1
   }
   await client.patch(`/offices/${id}`).send(officeNewInfo).expect(204);
  });
  it('invokes GET /offices/{id}', async () => {
    const response = await client.get(`/offices/${id}`).expect(200);
    expect(response.body).to.be.Object();
    expect(response.body).hasOwnProperty('location').to.be.true;
  });
  it('invokes DELETE /offices/{id}', async () => {
    await client.delete(`/offices/${id}`).expect(204);
  });
});
