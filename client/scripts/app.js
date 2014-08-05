$(document).ready(function() {


  var app = {
    init: function() {
      setInterval(this.fetchMessage.bind(this), 1000);
    },

    displayMessage: function(data) {
      var messages = data.results;
      $(".messages").html('');
      for (var i = 0; i < messages.length - 80; i++) {
        var userPlaceholder = document.createElement("li");
        var messagePlaceholder = document.createElement("span");

        var userNode = document.createTextNode(messages[i].username);
        var messageNode = document.createTextNode(messages[i].text);

        userPlaceholder.appendChild(userNode);
        messagePlaceholder.appendChild(messageNode);

        $(".messages").append("<li>" + "<span class='friend'>" + "<a href='#" + userPlaceholder.innerHTML + "'>" +
          userPlaceholder.innerHTML + "</a>" + "</span>" +
          "<span class='" + userPlaceholder.innerHTML + "'>: " + messagePlaceholder.innerHTML + "</span>" + "</li>");
      }
    },

    fetchMessage: function() {
      $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
        type: 'GET',
        contentType: 'application/jsonp',
        success: this.displayMessage
      })
    },

    createMessage: function(text, username, chatRoom) {
      var messageObj = {
        'username': username,
        'text': text,
        'roomname': chatRoom
      };
      this.send(messageObj);
    },

    send: function(message) {
      $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json'
      })
    }
  };


  $("div").find(".sendButton").click(function() {
    var textData = $('.messageBox').val();
    var usernameData = $('.username').val();
    var chatRoom = $('.chatRoom').val();
    app.createMessage(textData, usernameData, chatRoom);
  });


  app.init();
});
