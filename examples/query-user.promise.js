const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('./rally.properties');

var rally = require("rally"),
  queryUtils = rally.util.query,
  refUtils = rally.util.ref,
  restApi = rally({
    user: prop.get('user'), //required if no api key, defaults to process.env.RALLY_USERNAME
    pass: prop.get('pass'), //required if no api key, defaults to process.env.RALLY_PASSWORD
    //apiKey: getProperty('apiKey'), //preferred, required if no user/pass, defaults to process.env.RALLY_API_KEY
    apiVersion: prop.get('apiVersion'), //this is the default and may be omitted
    server: prop.get('server') //this is the default and may be omitted
    //any additional request options (proxy options, timeouts, etc.)
  });

function queryUsers() {
  return restApi.query({
    type: "Users",
    start: 1,
    pageSize: 2,
    limit: 10,
    order: "FirstName",
    fetch: ["FirstName", "LastName", "EmailAddress", "LastActiveDate", "LastLoginDate"],
    //fetch: "true", //All fields
    query: queryUtils.where("FirstName", "=", "Paula")
  });
}

function queryChildren(result) {
  return restApi.query({
    ref: result.Results[0].Children,
    start: 1,
    limit: 200,
    order: "Rank",
    fetch: ["FormattedID", "Name", "ScheduleState"]
  });
}

function onSuccess(result) {
  console.log("Success!", result);
}

function onError(error) {
  console.log("Failure!", error.message, error.errors);
}

queryUsers()
  //.then(queryChildren)
  .then(onSuccess)
  .catch(onError);
