const mongoose = require('mongoose');

const getConnection = async () => {

  try{
    const url = 'mongodb://sebaseditar:1uoTSdY1Nhf5ajNX@ac-pp9j53g-shard-00-00.gmglfnt.mongodb.net:27017,ac-pp9j53g-shard-00-01.gmglfnt.mongodb.net:27017,ac-pp9j53g-shard-00-02.gmglfnt.mongodb.net:27017/security-bd-iud?ssl=true&replicaSet=atlas-104lrg-shard-0&authSource=admin&retryWrites=true&w=majority';

    await mongoose.connect(url);

    console.log('CONEXION EXITOSA');

  } catch (errpr) {
    console.log(error);
  
  }
}

module.exports = {
  getConnection,
}