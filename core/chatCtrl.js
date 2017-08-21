(function() {
  //another comment...
  angular
    .module('chatBot')
    .controller('ChatCtrl', ChatController);

  function ChatController($scope, $rootScope, $http) {
    var chat = this;
		chat.chatResponses = [];
    chat.sendText = function(keycode) {


			 if(angular.isDefined(chat.chat_input) && chat.chat_input != ''){
				 var userObject = {};
				 userObject.response = chat.chat_input;
				 userObject.perspective = "user";
				 chat.chatResponses.push(userObject);

				 $http({
	         method: 'GET',
	         url: 'http://jzchatbot-jzchatbot2.a3c1.starter-us-west-1.openshiftapps.com/api/text/' + chat.chat_input,
					 params: { 'sessionID' : $rootScope.guid}

	       }).then(function successCallback(response) {
					 var botObj = {}
					 botObj.response = response.data.result.fulfillment.speech;
					 botObj.perspective = "bot";
					 chat.chatResponses.push(botObj);
					 console.log('What do we get?', response);
	         // this callback will be called asynchronously
	         // when the response is available
	       }, function errorCallback(response) {
	         // called asynchronously if an error occurs
	         // or server returns response with an error status.
	       });
			 }else{
				 var botObj = {};
				 botObj.response = "Say Something, Anything!";
				 botObj.perspective = "bot";
				 chat.chatResponses.push(botObj);
			 }



      console.log("TEXT SENT!!", chat.chat_input);
      chat.chat_input = '';
    }
  }
})();
