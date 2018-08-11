# Rally REST API for Node.js
Ref: <https://github.com/RallyTools/rally-node/wiki/User-Guide>

## Installing
> Node.js is required

```bash
$ git clone https://github.com/asantos2000/rally-node.git

$ cd rally-node

$ npm install
```

Create `rally.properties` file:

```ini
#required if no api key, defaults to process.env.RALLY_USERNAME
user=user_name
#required if no api key, defaults to process.env.RALLY_PASSWORD
pass=your_password
#preferred, required if no user/pass, defaults to process.env.RALLY_API_KEY
#apiKey='_12fj83fjk...'
#this is the default and may be omitted
apiVersion=v2.0
#this is the default and may be omitted
server=https://rally1.rallydev.com
```

## Running examples

```bash
$ node examples/query.promise.js
Success! { _rallyAPIMajor: '2',
  _rallyAPIMinor: '0',
  Errors: [],
  Warnings: [],
  TotalResultCount: 2,
  StartIndex: 1,
  PageSize: 2,
  Results:
   [ { _rallyAPIMajor: '2',
       _rallyAPIMinor: '0',
       _ref:
        'https://rally1.rallydev.com/slm/webservice/v2.0/hierarchicalrequirement/236213723664',
       _refObjectUUID: 'bfd3582b-c86c-4eed-b69b-0dc74cd74b77',
       _objectVersion: '88',
       _refObjectName:
        'A text',
       FormattedID: 'US4154',
       DirectChildrenCount: 0,
       Name:
        'A text',
       ScheduleState: 'Accepted',
       Blocked: false,
       _type: 'HierarchicalRequirement' } ] }

$ node examples/query.callback.js
Success! { _rallyAPIMajor: '2',
  _rallyAPIMinor: '0',
  Errors: [],
  Warnings: [],
  TotalResultCount: 2,
  StartIndex: 1,
  PageSize: 2,
  Results:
   [ { _rallyAPIMajor: '2',
       _rallyAPIMinor: '0',
       _ref:
        'https://rally1.rallydev.com/slm/webservice/v2.0/hierarchicalrequirement/236213723664',
       _refObjectUUID: 'bfd3582b-c86c-4eed-b69b-0dc74cd74b77',
       _objectVersion: '88',
       _refObjectName:
        'A text',
       FormattedID: 'US4154',
       DirectChildrenCount: 0,
       Name:
        'A text',
       ScheduleState: 'Accepted',
       Blocked: false,
       _type: 'HierarchicalRequirement' } ] }

$ node examples/crud.promise.js
Creating defect...
Defect created: /defect/245598891764
Reading defect...
Defect read: DE1780 - My Defect
Updating defect...
Defect updated: My Updated Defect
Deleting defect...
Success! { _rallyAPIMajor: '2',
  _rallyAPIMinor: '0',
  Errors: [],
  Warnings: [] }

$ node examples/crud.callback.js
Creating defect...
Defect created: /defect/245595835652
Reading defect...
Defect read: DE1779 - My Defect
Updating defect...
Defect updated: My Updated Defect
Deleting defect...
Success! { _rallyAPIMajor: '2',
  _rallyAPIMinor: '0',
  Errors: [],
  Warnings: [] }
```

🍺 Enjoy!!