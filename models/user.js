var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }

});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      // User.compare(password, user.password, function (err, result) {
      //   if (result === true) {
      //     return callback(null, user);
      //   } else {
      //     return callback();
      //   }
      // })

      if (password === user.password) {
        return callback(null, user);
      } else {
        return callback();
      }
    })

  }


  


//hashing a password before saving it to the database
// UserSchema.pre('save', function (next) {
//   var user = this;
//   bcrypt.hash(user.password, 10, function (err, hash) {
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   })
// });


var User = mongoose.model('User', UserSchema);
module.exports = User;

