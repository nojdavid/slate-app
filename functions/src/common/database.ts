const admin = require('firebase-admin');

const DatabaseClient = (model: any) => {

	/*
	*	CRUD DATABASE 
	* ** No delete needed for project **
	*/
	return {

		create(value: object) {
			return admin.database().ref(model.id).push(value)
				.then((snapshot: any) => {
			    return snapshot.ref.toString();
			  });
		},

		read(id: number) {
			return admin.database().ref(model.id + '/' + id).once('value')
				.then((snapshot: any) => {

					if (!snapshot.val()) {
						return undefined;
					}

					return snapshot.val();
				});
		},

		update(id: number, state: string) {
			return admin.database().ref(model.id + '/' + id).child('state').set(state)
				.then(function() {
			    return 'Update to state succeeded with value: ' + state;
			  })
			  .catch(function(error: object) {
			    return 'Update failed';
			  });
		}

	}
};

export default DatabaseClient;