
var dbConnect = require('./db-connect');
var ObjectID = require('mongodb').ObjectID;

module.exports = {
    getAll,
    getOne,
    create,
    destroy
};

/**
 * get all destinations
 * @param  {Function} done Called with either error or the array of data
 * @return {[type]}        [description]
 */
function getAll(done) {
    dbConnect(function connectHandler(err, db) {
        if (err) {
            done(err, null);
            return;
        }

        db.collection('jobs')
            .find()
            .toArray(function mapData(err, data){
              var mappedData = data.map(function(data){
                return {
                  'id': data._id,
                  'company': data.company,
                  'link': data.link
                };
              });
              done(err, mappedData);

            });  // OR just do this! Same thing as above
    });
}

function getOne(id, done) {
  dbConnect(function connectHandler(err, db){
    if (err) {
      done(err, null);
      return;
    }

    db.collection('jobs')
      .findOne({_id: new ObjectID(id)}, function callback(err, data){
        cleanData = {
          "id": data._id,
          "company": data.company,
          "notes": data.notes,
          "link": data.link,
          "createTime": data.createTime
        };
        done(null, cleanData);
      });
  });

}
function destroy(id, done) {
  dbConnect(function connectHandler(err, db){
    if (err) {
      done(err, null);
      return;
      }
    var cleanData = null;
    db.collection('jobs')
      .findOne({_id: new ObjectID(id)}, function callback(err, data){
        cleanData = {
          "id": data._id,
          "company": data.company,
          "notes": data.notes,
          "link": data.link,
          "createTime": data.createTime
        };
      });
      db.collection('jobs')
      .findOneAndDelete({_id: new ObjectID(id)}).then(function success(reason){
          done(null, cleanData);
      }, function failure(value) {
        done(value, null);
      });

});

}
/**
 * [create description]
 * @param  {[type]}   data [description]
 * @param  {Function} done [description]
 * @return {[type]}        [description]
 */
function create(data, done) {
    dbConnect(function connectHandler(err, db) {
        if (err) {
          done(err, null);
          return;
        }

        data.createTime = Date.now();
        db.collection('jobs')
            .insert(data, done);
    });
}
