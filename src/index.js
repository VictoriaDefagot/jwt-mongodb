const app = require('./app.js');
require('./database');

async function init(){
    await app.listen(3000);
    console.log('Server running on port 3000');
};

init();