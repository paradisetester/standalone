/*
*
* Profile page
*/
app.controller('ProfileCtrl', function($scope, $location, Req) {
	auth = firebase.auth();
	$scope.user;
	$scope.name;

	auth.onAuthStateChanged(function(res){
		$scope.user = res;
		$scope.name = res.displayName;
		$scope.$apply();
	});



	/*
	* edit profile
	*/
	$scope.updateUserProfile = function(name) {
		auth.currentUser.updateProfile({
			displayName: name
		}).then(function() {
			//Handle success here.
			Req.toast({status: 'success', message: 'Profile updated'});
			$location.path("/profile");
			$scope.$apply();
		}).catch(function(error) {
			// Handle Errors here
			Req.toast({status: 'error', message:  error.message});	
		});
	}
		
});


/*
*
* Tele Health page
*/
app.controller('TeleHealthCtrl', function($scope) {
	
});


/*
*
* Sdu page
*/
app.controller('SudCtrl', function($scope) {
	
});



