const userText = document.getElementById('userPrompt');
const sendButton = document.getElementById('sendButton');
const maxLines=200;

function clean() {
    userText.value = '';
    userText.style.height = 'auto';
}



userText.addEventListener('input', function() {

    if (this.scrollHeight<maxLines) {
        this.style.height=this.scrollHeight+'px';
    }
})

userText.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        clean();
    }
});

sendButton.addEventListener('click', async function() {
    clean();
})