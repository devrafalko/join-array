/* global Function, Infinity */

const argumentsTypes = require('typeof-arguments');
const propertiesTypes = require('typeof-properties');
const type = require('of-type');
const moduleName = require('./package.json').name;

module.exports = function (config){
  /* The first argument must be of type [Object] or [Array] */
  argumentsTypes(arguments,[[Array,Object]],(o)=>{
    throw new TypeError(`${moduleName}: ${o.message}`);
  });
  /* Check if the first argument is [Object] */
  const hasObjectConfig = type(config,Object);

  /*The properties of the [Object] config can be omitted. Then the default valued are attached. */
  const defaults = {
    separator:', ',
    last:' and ',
    max:Infinity,
    maxMessage:(missed)=>`(${missed} more...)`,
    each:null
  };

  if(!hasObjectConfig){
    /* The first argument is not [Object], so all arguments are validated. */
    argumentsTypes(arguments,[Array,[String,null,undefined],[String,null,undefined],[Number,null,undefined],[Function,String,null,undefined],[Function,null,undefined]],(o)=>{
      /* If any of the passed arguments does not match the expected type, throw an error. */
      throw new TypeError(`${moduleName}: ${o.message}`);
    });
    
    /* Arguments are valid and are converted into [Object] config object.
     * It is to unify the passed arguments, regardless they are given as [Object] config object or as separate arguments.
     * Then the further code always take [Object] config object for the computations. */
    const argumentsToObject = {};
    const properties = ['array','separator','last','max','maxMessage','each'];
    for(var i in arguments){
      argumentsToObject[properties[i]] = arguments[i];
    }
    config = argumentsToObject;

  } else {
    /* The first argument is [Object] so the properties of this [Object] argument are validated.
     * The 'expected' object contains the expected types of the given properties.
     * If the first argument is [Object], the next arguments are ignored. */
    const expected = {
      array:Array,
      separator:[String,null,undefined],
      last:[String,null,undefined],
      max:[Number,null,undefined],
      maxMessage:[Function,String,null,undefined],
      each:[Function,null,undefined]
    };
    propertiesTypes(config,expected,(o)=>{
      /* If any of the properties does not match the expected type, throw an error. */
      throw new TypeError(`${moduleName}: Invalid [Object] config argument. ${o.message}`);
    });
  }

  /* The not defined properties or arguments are replaced with default values. */
  for(var i in defaults){
    if(type(config[i],[null,undefined])) config[i] = defaults[i];
  }

  /* The arguments are valid.
   * The [Object] config object is ready to be computed. */
  var message = "";
  var eachDefined = type(config.each,Function);
  for(var i=0;i<config.array.length;i++){
    if(i===config.max-1 && config.array.length>config.max){
      /* Check the type of maxMessage, if [Function], call it and pass the missed items number. */
      const maxMessage = type(config.maxMessage,String) ? config.maxMessage:config.maxMessage(config.array.length-1-i);
      message += maxMessage + config.last;
      i = config.array.length-2;
      continue;
    }
    if(eachDefined) config.array[i] = config.each(config.array[i],i,config.array);
    message += config.array[i];
    if(i<config.array.length-2) message += config.separator;
    if(i===config.array.length-2) message += config.last;
  }
  return message;
};