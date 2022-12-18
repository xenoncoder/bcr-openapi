const bcrypt = require('bcrypt');

const hashPassword = (payload) => {
  return bcrypt.hashSync(payload, 10);
};

const comparePassword = (payload, compare) => {
  return bcrypt.compareSync(payload, compare);
};

module.exports = {hashPassword, comparePassword};
