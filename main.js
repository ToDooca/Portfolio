
const currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();

const TypeWriter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function () {
    let typeSpeed = 150;

    this.pause = function () {
        window.clearTimeout(timerId);
        remaining -= Date.now() - start;
    };

    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;


    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    // Check if word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
        if (this.wordIndex > 0) {
            return stop;
        }

    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
    }
    const timer = setTimeout(() => this.type(), typeSpeed)
    function stop() {
        clearTimeout(timer);
    }
    console.log(this.wordIndex);
}

//Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter

    new TypeWriter(txtElement, words, wait);

}
