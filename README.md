# VR Funding

**Deployed (master) - https://lambdavrfunding.herokuapp.com/**

Product Canvas Link - https://docs.google.com/document/d/1GcMreITeLMKTKSfJrm--foQD0BMXoCbIGimsz8kB8Vw/edit?usp=sharing

Data Structure Link - https://dbdesigner.page.link/7tSx

Trello - https://trello.com/b/t5k4cj9u/vr-funding

## API

**Users** - Endpoints relating to register, login, and projects for general user activity
- POST /register - Registers new user
  1. name
  2. email
  3. password
  4. type_id (identifies 'dreamer' or investor)
- POST /login - Login for users
  1. email
  2. password
- GET /projects - Returns all projects
- GET /projects/:id - Returns projects the 'dreamer' has created or all projects for investors

**Dreamers** - Endpoints relating to 'dreamers'
- POST /api/dreamers/projects - Creates project
  1. name (project title)
  2. dreamer_id ('dreamer' id creating the project)
  3. fund_target (total funds asking to be raised)
- PUT /api/dreamers/projects - Update project if current logged user is owner
- DELETE /api/dreamers/projects - Delete project is current logged user is owner

**Investors** - Endpoints relating to investors
- GET /api/investors/transactions - Returns all current logged investor's transactions
- POST /api/investors/transactions - Sends transaction data for investor (not linked to processor)
- GET /api/investors/projects - Returns all current logged investor's funded projects
