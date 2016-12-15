
var express = require('express');
var jobsModel = require('../models/jobs');

// This will be my collection of routes for "/destinations"
var router = express.Router();

router.get('/', function allJobs(req, res) {

    jobsModel.getAll(function dataRetrieved(err, data) {
        if (err) {
            console.error(err);
            res.status(500).send('Uh oh... couldn\'t get your data');
            return;
        }
        res.json( data );

    });
});

/**
 * Handles individual destination route where the URL matches something like:
 * /destinations/123456789012345678901234
 *
 * @param  {Object} req
 * @param  {Object} res
 * @return {void}
 */
router.get('/:id([a-f0-9]{24})', function getAJob(req, res) {
  jobsModel.getOne(req.params.id, function dataRetrieved(err, data) {
    if (err) {
        console.error(err);
        res.status(500).send('Uh oh... couldn\'t get your data');
        return;
    }
    res.json( data );
  });
});

router.post('/', function createJob(req, res) {

    jobsModel.create(req.body, function dataCreated(err, data) {
        if (err) {
          console.error(err);
          res.status(500).send('Uh oh... couldn\'t post your data');
          return;
        }
        res.json(
          {
            "company": data.ops[0].company,
            "notes": data.ops[0].notes,
            "link": data.ops[0].link,
            "createTime": data.ops[0].createTime
          });
    });
});

router.delete('/:id([a-f0-9]{24})', function destroyJob(req, res){
  jobsModel.destroy(req.params.id, function dataDeleted(err, data){
    if (err) {
      console.error(err);
      res.status(400).send('Sorry...couldn\'t delete your data');
      return;
    }
    res.json(data);
  });
});



module.exports = router;
