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

function createDefect() {
    console.log('Creating defect...');
    return restApi.create({
        type: 'defect',
        data: {
            Name: 'My Defect',
            Environment: 'Test'
        }
    });
}

function readDefect(result) {
    console.log('Defect created:', refUtils.getRelative(result.Object));
    console.log('Reading defect...');
    return restApi.get({
        ref: result.Object,
        fetch: ['FormattedID', 'Name']
    });
}

function updateDefect(result) {
    console.log('Defect read:', result.Object.FormattedID, '-', result.Object.Name);
    console.log('Updating defect...');
    return restApi.update({
        ref: result.Object,
        data: {
            Name: 'My Updated Defect'
        },
        fetch: ['Name']
    });
}

function deleteDefect(result) {
    console.log('Defect updated:', result.Object.Name);
    console.log('Deleting defect...');
    return restApi.del({
        ref: result.Object
    });
}

function onSuccess(result) {
    console.log('Success!', result);
}

function onError(error) {
    console.log('Failure!', error.message, error.errors);
}

createDefect()
    .then(readDefect)
    .then(updateDefect)
    .then(deleteDefect)
    .then(onSuccess)
    .catch(onError);
