class Automata {
    constructor(game) {
        this.game = game;
        this.width = 200;
        this.height = 100;
        this.automata = this.createEmptyAutomata();
        this.tickCount = 0;
        this.ticks = 0;
        this.speed = this.getSpeedFromInput();
        this.cellSize = this.getCellSizeFromInput();
        this.initializeEventListeners();
        this.loadRandomAutomata();
    }

    createEmptyAutomata() {
        const automata = [];
        for (let c = 0; c < this.width; c++) {
            automata.push(new Array(this.height).fill(0));
        }
        return automata;
    }

    getSpeedFromInput() {
        return parseInt(document.getElementById("speed").value, 10);
    }

    getCellSizeFromInput() {
        return parseInt(document.getElementById("zoom").value, 10);
    }

    initializeEventListeners() {
        document.getElementById("speed").addEventListener("change", () => {
            this.speed = this.getSpeedFromInput();
        });

        document.getElementById("zoom").addEventListener("change", () => {
            this.cellSize = this.getCellSizeFromInput();
        });
    }

    loadRandomAutomata() {
        for (let c = 0; c < this.width; c++) {
            for (let r = 0; r < this.height; r++) {
                this.automata[c][r] = this.randomInt(2);
            }
        }
    }

    randomInt(max) {
        return Math.floor(Math.random() * max);
    }

    countAliveNeighbors(c, r) {
        let count = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if ((i || j) && this.automata[c + i] && this.automata[c + i][r + j]) {
                    count++;
                }
            }
        }
        return count;
    }

    update() {
        if (this.tickCount++ >= this.speed && this.speed !== 120) {
            this.tickCount = 0;
            this.ticks++;
            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;

            const nextAutomata = this.createEmptyAutomata();

            for (let c = 0; c < this.width; c++) {
                for (let r = 0; r < this.height; r++) {
                    const aliveNeighbors = this.countAliveNeighbors(c, r);
                    if (this.automata[c][r] && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
                        nextAutomata[c][r] = 1;
                    }
                    if (!this.automata[c][r] && aliveNeighbors === 3) {
                        nextAutomata[c][r] = 1;
                    }
                }
            }

            this.automata = nextAutomata;
        }
    }

    draw(ctx) {
        const size = this.getCellSizeFromInput();
        const gap = 1;
        ctx.fillStyle = "Black";
        for (let c = 0; c < this.width; c++) {
            for (let r = 0; r < this.height; r++) {
                const cell = this.automata[c][r];
                if (cell) {
                    ctx.fillRect(c * size + gap, 
                                 r * size + gap, 
                                 size - 2 * gap, 
                                 size - 2 * gap);
                }
            }
        }
    }
}
