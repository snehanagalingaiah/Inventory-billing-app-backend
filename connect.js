const mongoose = require('mongoose');

module.exports = {
    async connectMongoose(){
        try {
            await mongoose.connect(process.env.MONGOOSE_URL)
            console.log('connection success');
        } catch(err) {
            console.error(err);
        }
    }
}