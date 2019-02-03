var socket = io();

socket.on('connect', function () {
    console.log('Connected to srever');
});

socket.on('disconnect', function () {
    console.log('Disconnected from  server');
});

socket.on('newMessage', function (chat) {
    console.log('Chat:',chat);
    var li = jQuery('<li></li>');
    li.text(chat.from+': '+chat.text);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from:'User',
        text: jQuery('[name=message]').val()
    }, function() {

    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        var coords = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        };

        socket.emit('createLocationMessage', coords);
    }, function () {
        alert('unable to fetch location');
    });
});