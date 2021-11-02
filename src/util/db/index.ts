const mongoose = require('mongoose');

  export default class DbConnection {
    constructor(url: string | undefined) { 
        mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('mongodb connection established. ⚔️📡'))
  }
}  
    
