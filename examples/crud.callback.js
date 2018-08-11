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

function onError(error) {
    console.log('Failure!', error.message, error.errors);
}

function createDefect(result) {
    console.log('Creating defect...');
    restApi.create({
        type: 'defect',
        data: {
            Name: 'My Defect',
            Environment: 'Test'
        }
    }, function(error, result) {
        if(error) {
            onError(error);
        } else {
            console.log('Defect created:', refUtils.getRelative(result.Object));
            readDefect(result);
        }
    });
}

function readDefect(result) {
    console.log('Reading defect...');
    restApi.get({
        ref: result.Object,
        fetch: ['FormattedID', 'Name']
    }, function(error, result) {
        if(error) {
            onError(error);
        } else {
            console.log('Defect read:', result.Object.FormattedID, '-', result.Object.Name);
            updateDefect(result);
        }
    });
}

function updateDefect(result) {
    console.log('Updating defect...');
    restApi.update({
        ref: result.Object,
        data: {
            Name: 'My Updated Defect'
        },
        fetch: ['Name']
    }, function(error, result) {
        if(error) {
            onError(error);
        } else {
            console.log('Defect updated:', result.Object.Name);
            deleteDefect(result);
        }
    });
}

function deleteDefect(result) {
    console.log('Deleting defect...');
    restApi.del({
        ref: result.Object
    }, function(error, result) {
        if(error) {
            onError(error);
        } else {
            console.log('Success!', result);
        }
    });
}

createDefect(readDefect);
