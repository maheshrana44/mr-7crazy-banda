/let socket = io();

// Handle Google Sign-In
function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let userName = profile.getName();
    let userId = profile.getId();
    console.log('Welcome ' + userName);

    // Hide login and show movie section
    document.querySelector('.g-signin2').style.display = 'none';
    document.getElementById('movie-section').style.display = 'block';

    // Send user data to backend (optional)
    socket.emit('userLoggedIn', { userId, userName });
}

// WebRTC - Start Voice Chat
function startVoiceChat() {
    const movieVideo = document.getElementById('movie-video');
    const localStream = navigator.mediaDevices.getUserMedia({ audio: true });

    localStream.then(stream => {
        const peerConnection = new RTCPeerConnection();
        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

        peerConnection.onicecandidate = event => {
            if (event.candidate) {
                socket.emit('newIceCandidate', event.candidate);
            }
        };

        socket.emit('startVoiceChat', { userId: 'userId' }); // Send user info to the server
    });
}

// Real-Time Communication: Listen for movie sync and chat events
socket.on('syncMovie', data => {
    const movieVideo = document.getElementById('movie-video');
    if (data.action === 'play') movieVideo.play();
    else if (data.action === 'pause') movieVideo.pause();
});
