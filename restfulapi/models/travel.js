var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
var travelSchema = mongoose.Schema({
  name: String,
  price: String,
});

var travel = mongoose.model("travel", travelSchema);

function validateTravel(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    price: Joi.string().min(0).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.travel = travel;
module.exports.validate = validateTravel;
