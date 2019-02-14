var express = require('express');
var router = express.Router();
const staticModels = require('../staticModels/mockdb');
const sqlite = require('sqlite3').verbose();
const models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/staticTasks', function(req, res, next) {
  let tasks = staticModels.tasks;
  res.send(JSON.stringify(staticModels.tasks));
});

router.get('/tasks', function(req, res, next) {
  models.tasks.findAll({
    where: {
      deleted: null
    }
  }).then( tasksFound => {
    const mappedTasks = tasksFound.map(task => ({
      id: task.id,
      title: task.title,
      details: task.details,
    completed: task.completed
    }));
    res.send(JSON.stringify(mappedTasks));
  });
});

router.get('/tasks/:id', function(req, res, next) {
  let taskId = parseInt(req.params.id);
  models.tasks
  .find({
    where: {
      id: taskId
    }
  })
  .then(specificTask => {
    res.send(JSON.stringify(specificTask));
  })
});

router.post('/tasks', function(req, res, next) {
  models.tasks
  .findOrCreate({
    where: {
      title: req.body.title,
      details: req.body.details,
      completed: req.body.completed,
      createdAt: Date.now()
    }
  })
  .spread(function(result, created) {
    if (created) {
      res.send(JSON.stringify(result));
    }
  })
});

router.put('/tasks/:id', (req, res, next) => {
  let taskId = parseInt(req.params.id);
  models.tasks
  .update(
    {
      title: req.body.title,
      details: req.body.details,
      completed: req.body.completed,
      updatedAt: Date.now()
    },
    {
      where: {
        id: taskId
      }
    })
  .then(result => {
    res.send(JSON.stringify(result));
  });
});

router.delete('/tasks/:id', (req, res, next) => {
  let taskId = parseInt(req.params.id);
  /* Hard delete
  models.tasks
    .destroy({ where: { id: taskId }})
    .then( t => res.send());  */

  // Soft delete
  models.tasks
    .update({ deleted: true }, { where: { id: taskId }})
    .then( t => res.send());
});

module.exports = router;
