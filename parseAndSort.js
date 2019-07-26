var fs = require('fs');

/*
to use from command line type the following command after using the firebase-export tool
node -e 'require("./parseAndSave").go({FIREBASE_EXPORTED_FILENAME}})'
*/

function parseAndSaveEntities(fileName) {
	fs.readFile(fileName, 'utf-8', function(err, data) {
		var collections = JSON.parse(data)['__collections__'];
		var collectionNames = Object.keys(collections);
		collectionNames.forEach(function(collectionName) {
			var fileName = __dirname + '/' + collectionName
			var entities = collections[collectionName];
			var entityIds = Object.keys(entities);
			var data = entityIds.map(function(entityId) {
				return {
					...entities[entityId],
					_id: entityId
				}
			});
			fs.writeFile(fileName + '.json', JSON.stringify(data), function(err) {
				if (err) {
					console.error(err);
					return;
				}
				console.log(fileName + ' was successfully created with ' + data.length + ' records')
			})
		})
	})
}

module.exports.go = parseAndSaveEntities;
