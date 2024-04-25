class Puissance4 {
    constructor(container, options) 
    {
        this.container = container;
        this.options = Object.assign({
            gridSizeX: 7,
            gridSizeY: 6,
            player1Color : this.color1,
            player2Color : this.color2
        }, options);
        this.color2 = this.options.player2Color;
        this.color1 = this.options.player1Color;
        if (this.options.player1Color === this.options.player2Color) {
            console.error("Les couleurs des joueurs doivent être différentes !");
            alert(`Les couleurs des joueurs doivent être différentes !`);
            return;
        }
        this.currentPlayer = 1;
        this.Grid();
        this.infos = document.getElementById('info1');
        this.infos.innerHTML = `Player 1 : ${this.color1}`;
        this.infos = document.getElementById('info2');
        this.infos.innerHTML = `Player 2 : ${this.color2}`
        var btn = document.querySelector("input");
        btn.addEventListener("click",this.resetGame.bind(this));
    }

    Grid() 
    {
        this.grid = [];
        for (let i = 0; i < this.options.gridSizeY; i++) {
            let row = [];
            for (let j = 0; j < this.options.gridSizeX; j++) {
                row.push(0);
            }
            this.grid.push(row);
        }
        this.render();
    }
    
    render() {
        this.container.innerHTML = '';
        this.grid.forEach((row, rowIndex) => {
            let rowElement = document.createElement('div');
            rowElement.classList.add('puissance4-row');
            row.forEach((cell, colIndex) => {
                let cellElement = document.createElement('div');
                cellElement.classList.add('puissance4-cell');
                if (cell === 1) {
                    cellElement.classList.add(this.color1);
                } else if (cell === 2) {
                    cellElement.classList.add(this.color2);
                }
                cellElement.addEventListener('click', () => this.Move(colIndex));
                rowElement.appendChild(cellElement);
            });
            this.container.appendChild(rowElement);
        });
    }
 
    resetGame() 
    {
        this.Grid();
        this.currentPlayer = 1;
        this.element.innerHTML = " ";
        this.infos.innerHTML =  " ";
    }

    Move(column) {
        let rowIndex = this.options.gridSizeY - 1;
        while (rowIndex >= 0 && this.grid[rowIndex][column] !== 0) {
            rowIndex--;
        }
        if (rowIndex >= 0) {
            this.grid[rowIndex][column] = this.currentPlayer;
            this.element = document.getElementById('resultat');
            if (this.win(rowIndex, column)) {
                this.element.innerHTML = `Player ${this.currentPlayer} wins !`;
                this.render();
                alert(`Player ${this.currentPlayer} wins !`)
                return;
            }
            if (this.checkDraw()) 
            {
                this.render();
               alert(`Match nul!`);
                return;
            }
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            this.infos = document.getElementById('tour');
            this.infos.innerHTML =  `Player ${this.currentPlayer} turn !`;
            this.render();
        }
    }
    
    checkDraw() {
        for (let row of this.grid) {
            if (row.includes(0)) {
                return false;
            }
        }
        return true;
    }
    
    win(rowIndex, colIndex) {
        const directions = [
            [0, 1], // horizontal
            [1, 0], // vertical
            [1, 1], // diagonal /
            [-1, 1] // diagonal \
        ];
        const currentPlayer = this.grid[rowIndex][colIndex];
        for (let [dx, dy] of directions) {
            let count = 1;
            let x = colIndex + dx;
            let y = rowIndex + dy;
            while (x >= 0 && x < this.options.gridSizeX && y >= 0 && y < this.options.gridSizeY && this.grid[y][x] === currentPlayer) {
                count++;
                x += dx;
                y += dy;
            }
            x = colIndex - dx;
            y = rowIndex - dy;
            while (x >= 0 && x < this.options.gridSizeX && y >= 0 && y < this.options.gridSizeY && this.grid[y][x] === currentPlayer) {
                count++;
                x -= dx;
                y -= dy;
            }
            if (count >= 4) {
                return true;
            }
        }
        return false;
    }
}

const container = document.getElementById('container');
const puissance4 = new Puissance4(container, {
    gridSizeX: 5,
    gridSizeY: 5,
    player1Color: 'yellow',
    player2Color: 'red'
});

