myApp.factory('Authentication', ['$rootScope', '$location', '$firebaseAuth', '$firebaseObject', function($rootScope, $location, $firebaseAuth, $firebaseObject){
  var ref = firebase.database().ref();
  var auth = $firebaseAuth();
  var myObject;

  auth.$onAuthStateChanged(function(authUser) {
  	if(authUser) {
  	  var userRef = ref.child('users').child(authUser.uid);
  	  var userObj = $firebaseObject(userRef);
  	  $rootScope.currentUser = userObj;
  	} else {
  	  $rootScope.currentUser = '';
  	}
  });

  myObject = {
    login: function(user) {
      auth.$signInWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(user) {
        $location.path("#!/view1/meetings");
      }).catch(function(error) {
        $rootScope.message = error.message;
      });
    },
    register: function(user) {
   //    if (!$rootScope.user.firstname || $rootScope.user.firstname === "" ||
    //  !$rootScope.user.lastname || $rootScope.user.lastname === "" ||
    //  !$rootScope.user.email || $rootScope.user.firstname === "" ||
    //  !$rootScope.user.password || $rootScope.user.password === "") {
    //   return;
    // }

    auth.$createUserWithEmailAndPassword(
      user.email,
      user.password
    ).then(function(regUser) {
      var regRef = ref.child('users')
      .child(regUser.uid).set({
        date: firebase.database.ServerValue.TIMESTAMP,
        regUser: regUser.uid,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      });
      $rootScope.message = "Welcome " + user.firstname;
      myObject.login(user);
    }).catch(function(error) {
      $rootScope.message = error.message;
    });
    },
    logout: function() {
      return auth.$signOut();
    },
    requireAuth: function() {
      return auth.$requireSignIn();
    }
  };

  return myObject;


}])