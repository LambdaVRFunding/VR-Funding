const db = require('../../data/dbConfig.js');
const Users = require('./user-model.js');

describe('User models', () => {

  describe('addUser()', () => {
    it('should add user', async () => {
      const user = {
        name: 'Bon Jovi',
        password: 'Jovi Bon',
        email: 'jon@bovi.com',
        location: '',
        type_id: 1
      }

      await Users.addUser(user);

      const [add] = await db('users').where('email','jon@bovi.com');

      expect(add.name).toBe('Bon Jovi');
    });
  });

  describe('findUser()', () => {
    it('should return user', async () => {
      const email = 'jon@bovi.com';

      const [found] = await Users.findUser({email});

      expect(found.name).toBe('Bon Jovi');
      expect(found.type_id).toBe(1);
    });
  });

  describe('deleteUser()', () => {
    it('should delete user', async () => {
      const [user] = await db('users').where('email',  'jon@bovi.com');

      console.log(user.email);
      
      await Users.deleteUser(user.email);
      
      const [checkDel] = await db('users').where('email',  'jon@bovi.com');
      
      expect(checkDel).toBe(undefined);
    })
  })

  describe('getProjects()', () => {
    it('should return all projects', async () => {
      const projs = await Users.getProjects();

      expect(projs).toHaveLength(2);
    });
  });

  describe('getProjById()', () => {
    it('should get specific project', async () => {
      const id = 1;

      const [getProj] = await Users.getProjById({id});

      expect(getProj.name).toBe("VR Gun Game");
      expect(getProj.dreamer_id).toBe(1);
    });
  });

  describe('getProjByUserId()', () => {
    it('should get specific user\'s projects', async () => {
      const id = 1;

      const getProjs = await Users.getProjByUserId(id);

      expect(getProjs).toHaveLength(2);
    });
  })

});