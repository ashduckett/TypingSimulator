let time = new Date();
let underscoreTime = new Date();

class TypingSimulator {

    constructor() {
        this.finalString = [];
        this.currentChar = 0;
        this.string = '';
        this.shouldAddUnderscore = false;
    }

    start() {
        requestAnimationFrame(this.draw.bind(this));
    }

    write(string) {
        this.finalString = this.finalString.concat(string.split(''));
    }

    delete(count) {
        for (var i = 0; i < count; i++) {
            this.finalString = this.finalString.concat([TypingSimulator.DeleteKey]);
        }
    }

    enter() {
        this.finalString = this.finalString.concat([TypingSimulator.EnterKey]);
    }

    draw() {
        // Get this fresh each frame.
        let currentTime = new Date().getTime();

        if (currentTime - underscoreTime.getTime() >= 250) {
            this.shouldAddUnderscore = !this.shouldAddUnderscore;
            underscoreTime = new Date();
        }
    
        const randomDelay = Math.floor(Math.random() * 5000);

        if (currentTime - time.getTime() >= randomDelay) {
            if (this.currentChar < this.finalString.length) {

                if (typeof this.finalString[this.currentChar] === 'string') {
                    this.string += this.finalString[this.currentChar];
                } else {
                    switch (this.finalString[this.currentChar]) {
                        case TypingSimulator.DeleteKey:
                            this.string = this.string.substring(0, this.string.length - 1); 
                            break;
                    }
                }
                this.currentChar++;
            } else {
                // Loops for now, unconditionally. I doubt anybody else will use this thing so I don't care right now.
                this.currentChar = 0;
                this.string = '';
            }
            time = new Date();
        }

        // Render
        var c = document.getElementById('paper');
        var ctx = c.getContext("2d");
        ctx.font = "30px Courier New";
        ctx.fillStyle = 'white';
        
        // Now break up the text into separate lines
        
        
        ctx.clearRect(0, 0, 1000, 500);
        ctx.fillText('>' + this.string + (this.shouldAddUnderscore ? '_' : '') , 10, 50);    
        requestAnimationFrame(this.draw.bind(this));
    }
}

TypingSimulator.DeleteKey = 0;
TypingSimulator.EnterKey = 1;

const ts = new TypingSimulator();
ts.start();
ts.write('Hello. My name is Ash. I am a front-end developer.');
ts.delete(20);
ts.write('backend developer.');
ts.delete(18);
ts.write('iOS developer.');


/*
    For multiline support you will need multiple calls to fillText.

    1. Add new key.
    2. Add function to add enter.

*/