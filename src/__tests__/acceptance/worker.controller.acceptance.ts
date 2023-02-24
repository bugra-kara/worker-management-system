import {Client, expect} from '@loopback/testlab';
import {WorkerManagementSystemApplication} from '../..';
import {setupApplication} from './test-helper';

describe('WorkerController', () => {
  let app: WorkerManagementSystemApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });
  let id: number;
  it('invokes GET /workers', async () => {
    const response = await client.get('/workers').expect(200);
    expect(response.body).to.be.Array();
  });

  it('invokes POST /workers', async () => {
    let workerInfo = {
     name: "Test",
     surname: "Test 2",
     email: "test@test.com",
     phone: "123123123",
     date_of_join: "2023-02-15T21:28:44.347Z",
     salary: 13342,
     departmant: 4,
     title: "Software Developer",
     manager: 5
    }
    const response = await client.post('/workers').send(workerInfo).expect(200);
    expect(response.body).to.be.Object();
    expect(response.body).hasOwnProperty('name').to.be.true;
    id = response.body.id
  });

  it('invokes PATCH /workers/{id}', async () => {
   let workerNewInfo = {
    name: "Test 2",
    surname: "Test 3",
    email: "test2@test.com",
    phone: "1231231231",
    date_of_join: "2023-02-15T21:28:44.347Z",
    salary: 133421,
    manager: 5,
    status: 1
   }
    await client.patch(`/workers/${id}`).send(workerNewInfo).expect(204);
  });

  it('invokes GET /workers/{id}', async () => {
   await client.get(`/workers/${id}`).expect(200);
  });

  it('invokes GET /workers/salary', async () => {
   const response = await client.get(`/workers/salary`).expect(200);
   expect(response.body).to.be.Array();
   expect(response.body).to.have.length(4);
   expect(response.body.map((e: { departmant_name: any; })=>e.departmant_name)).to.containEql('Software');
 });

 it('invokes GET /manager/{id}', async () => {
  const response = await client.get(`/workers/manager/5`).expect(200);
  expect(response.body).to.be.Array();
  expect(response.body.map((e: { id: any; })=>e.id)).to.containEql(id);
});

it('invokes PATCH /workers/change-title/{id}', async () => {
 let workerChangeTitle = {
  start_date: "2023-02-17T21:28:44.347Z",
  old_end_date: "2023-02-16T21:28:44.347Z",
  title: "Lead Software Developer",
  departmant: 2,
  manager: 1
}
  await client.patch(`/workers/change-title/${id}`).send(workerChangeTitle).expect(204);
});

it('invokes GET /workers/change-title/{id}', async () => {
 const response = await client.get(`/workers/change-title/${id}`).expect(200);
 expect(response.body).to.be.Array();
 expect(response.body).to.have.length(2);
 expect(response.body.map((e: { title: any; })=>e.title)).to.containEql("Lead Software Developer");
});

  it('invokes DELETE /workers/{id}', async () => {
    await client.delete(`/workers/${id}`).expect(204);
  });
});
