const request = require('supertest');

const server = require('../../api/server.js');
const db = require('../../data/dbConfig.js');
const Dreamers = require('./dreamer-model.js');
const Users = require('../users/user-model.js');

describe('dreamers models', () => {

  describe('createProject()', () => {
    // beforeEach(async () => {
    //     await db('projects').truncate();
    //   })
    
    it('should add project', async () => {
      const newProj = {
        name: 'NewTest',
        description: 'The best VR experience',
        dreamer_id: 1,
        fund_target: 5000,
        fund_current: 0
      }
      
      await Dreamers.createProject(newProj);
  
      const add = await db('projects').where('name', 'NewTest');

      expect(add).toHaveLength(1);
    });
  })

  describe('updateProject()', () => {
    it('should update project', async () => {
      const [proj] = await db('projects').where('name', 'NewTest');

      const updatedProj = {
        ...proj,
        name: 'UpdatedTest',
        fund_target: 6000
      };
  
      await Dreamers.updateProject(proj.id, updatedProj);

      const [update] = await db('projects').where('name', 'UpdatedTest');
  
      expect(update.name).toBe('UpdatedTest');
      expect(update.fund_target).toBe(6000);
    });
  })

  describe('deleteProject()', () => {
    // beforeEach(async () => {
    //   await db('projects').truncate();
    // })

    it('should delete project', async () => {
      const [proj] = await db('projects').where('name', 'UpdatedTest');
      
      await Dreamers.deleteProject(proj.id);
      
      const deleted = await db('projects').where('name', 'UpdatedTest');

      expect(deleted).toHaveLength(0);
    });
  })

  // it('POST new project', () => {
  //   request(server)
  //     .post('/api/dreamers/')
  // })

})