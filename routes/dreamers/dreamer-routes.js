const router = require('express').Router();

const verify = require('../../auth/authenticate-middleware');

const Dreamers = require('./dreamer-model');

router.post('/projects', verify, async (req, res) => {
    const project = req.body;

    try {
        const addProject = await Dreamers.createProject(project);

        if (addProject) {
            res.status(201).json(project);
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

router.put('/projects/:id', verify, async (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    try {
        const updatedProj = await Dreamers.updateProject(id, changes);
        if (updatedProj) {
            res.status(200).json(updatedProj);
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/projects/:id', verify, async (req, res) => {
   const { id } = req.params;

   try {
        const delProj = await Dreamers.deleteProject(id);

        if (delProj) {
            res.status(204).end();
        }
   } catch (err) {
    res.status(500).json({
        error: err.message
    });
   }
});

module.exports = router;