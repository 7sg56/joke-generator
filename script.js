const joke = document.querySelector('#jokeBar');
const jokeBtn = document.querySelector('#jokeBtn');
const url = `https://v2.jokeapi.dev/joke/`;
const jokeType = document.querySelector('#jokeType');

let typingInterval;

const writeAnimation = (string) => {
    let index = 0;
    
    if (typingInterval) {
        clearInterval(typingInterval);
    }

    typingInterval = setInterval(() => {
        if (index < string.length) {
            joke.innerHTML += string.charAt(index);
            index++;
        } else {
            clearInterval(typingInterval);
        }
    }, 30);
};

const generateJoke = async () => {
    if (window.setInterval) {
        clearInterval(window.setInterval);
    }
    joke.innerHTML = '';
    try {
        const res = await axios.get(`${url}${jokeType.value}?type=single`);
        const jokeText = res.data.joke || `${res.data.setup}<br><br>${res.data.delivery}`;
        writeAnimation(jokeText);
    } catch (e) {
        writeAnimation('Sorry, something went wrong.');
        console.error(e);
    }
};

jokeBtn.addEventListener('click', generateJoke);
