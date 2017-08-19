(function() {
  //another comment...
  angular
    .module('chatBot')
    .controller('ChatCtrl', ChatController);

  function ChatController($scope, $rootScope, $http) {
    var chat = this;
		chat.chatResponses = [];
    chat.sendText = function(keycode) {

       chat.chatResponses.push("YOU> " + chat.chat_input);

      $http({
        method: 'GET',
        url: 'http://jzchatbot-jzchatbot.a3c1.starter-us-west-1.openshiftapps.com/api/text/' + chat.chat_input
      }).then(function successCallback(response) {

				console.log('What do we get?', response);
				chat.chatResponses.push("CCC> " + response.data.result.fulfillment.speech);
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
      console.log("TEXT SENT!!", chat.chat_input);
      chat.chat_input = '';
    }
  }
})();
