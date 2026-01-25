const { Service } = require("feathers-mongoose");
const FindService = require("../../utils/abstracts/FindService");
const MixedService = FindService(Service);

exports.PersonalDevelopment = class PersonalDevelopment extends MixedService {
  
};