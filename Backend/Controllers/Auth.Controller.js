const createError = require('http-errors')
const User = require('../Models/User.model')
const {
  signAccessToken,

} = require('../helpers/jwt_helper')
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
  register: async (req, res, next) => {
    try {
      const { name,email, password ,role} = req.body

      const doesExist = await User.findOne({ where: {email} })
      if (doesExist)
        throw createError.Conflict(`${email} is already been registered`)

      bcrypt.hash(password, saltRounds, async function(err, hash) {
       
        const user = new User({ name,email, "password":hash ,role})
        const savedUser = await user.save()
     //   const accessToken = await signAccessToken(savedUser.id,savedUser.role);
        var userData=Object.assign({}, savedUser.toJSON());
        delete userData["password"];
        res.status(200).send({Message:"User Registered SuccessFully."})
      });
     
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      var user = await User.findOne({where: {email} })
      if (!user) throw createError.NotFound('User not registered')
        
      if (bcrypt.compareSync(password, user.password)) {
        
        var userData=Object.assign({}, user.toJSON());
        delete userData["password"];
        const accessToken = await signAccessToken(userData.id,userData.role)
        res.send({userData, accessToken });
      }
      else{
        throw createError.Unauthorized('Username/password not valid')
      }
      

     
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid Username/Password'))
      next(error)
    }
  },


}
