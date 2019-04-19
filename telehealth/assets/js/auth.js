/*
*
* login controller
*/
app.controller('LoginCtrl', function($scope, $location, Req) {
	var auth = firebase.auth();
	
	/*
	* login users
	*/
	$scope.loginUser = function() {
		auth.signInWithEmailAndPassword($scope.email, $scope.password).then(function(result) {
			//Handle success here.
			Req.toast({status: 'success', message: 'Welcome back'});
			$location.path("/tele-health");
			$scope.$apply();
		}).catch(function(error) {
			// Handle Errors here
			Req.toast({status: 'error', message:  error.message});	
		});
	}

	/*
	* register users
	*/
	$scope.registerUser = function() {
		auth.createUserWithEmailAndPassword($scope.email, $scope.password).then(function(result) {
			//Handle success here.
			$location.path("/");
			Req.toast({status: 'success', message: 'Register Successfully'});
			$scope.$apply();
		}).catch(function(error) {
			// Handle Errors here.
			Req.toast({status: 'error', message:  error.message});
		});
	}

	/*
	* google login
	*/
	$scope.googleLogin = function() {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

		auth.signInWithPopup(provider).then(function(result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			Req.toast({status: 'success', message: 'Welcome back'});
			$location.path("/tele-health");
			$scope.$apply();
		}).catch(function(error) {
			// Handle Errors here.
			Req.toast({status: 'error', message:  error.message});
		});
	}
});


/*
*
* logout controller
*/
app.controller('LogoutCtrl', function($scope, Req) {
	//sign out firebase
	firebase.auth().signOut();
	Req.toast({status: 'success', message: 'Logout Successfully!'});
});



