const dotenv = require('dotenv');

dotenv.config();
const configure = {
  MONGODB_URI: process.env.URL
};

module.exports = {configure}
