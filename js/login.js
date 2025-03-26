function validateUsername() {
    const username = document.getElementById('username').value.trim();
    const regex = /^[a-zA-Z]+$/;
    if (username && regex.test(username)) {
        document.getElementById('username').setAttribute('value', username);
        window.location.href = 'game.html';
    } else {
        alert('Please enter a valid username containing only letters.');
    }
}

function resetUsername() {
    const usernameInput = document.getElementById('username');
    usernameInput.value = '';
    usernameInput.removeAttribute('value');
}
