document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div')
    let doodlerLeftSpace = 50;
    let doodlerBottomSpace = 150;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId;
    let downTimerId;

    const createDoodler = () => {
        grid.appendChild(doodler);
        doodler.classList.add('doodler')
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';
    }


    class Platform {
        constructor(bottom) {
            this.bottom = bottom;
            this.left = Math.random() * 315;
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.style.bottom = this.bottom + 'px';
            visual.style.left = this.left + 'px';
            visual.classList.add('platform');
            grid.appendChild(visual)
        }
    }

    const createPlatforms = () => {
        for (let i = 0; i < platformCount; i ++) {
            let platformGap = 600 / platformCount;
            let newPlatformBottom = 100 + i * platformGap;
            let newPlatform = new Platform(newPlatformBottom);
            platforms.push(newPlatform);
        }
    }

    function movePlatforms() {
        if (doodlerBottomSpace > 100) {
            platforms.forEach(platform => {
                platform.bottom -= 4;
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px';
            })
        }
    }

    function jump() {
        clearInterval(downTimerId);
        upTimerId = setInterval(() => {
            doodlerBottomSpace += 10;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if (doodlerBottomSpace > 350) {
                fall();
            }
        }, 30);
    }

    function fall() { 
        clearInterval(upTimerId);
        downTimerId = setInterval(() => {
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if (doodlerBottomSpace <= 0) {
                gameOver();
            }
        }, 30)
    }

    const gameOver = () => {
        isGameOver = true;
        clearInterval(upTimerId);
        clearInterval(downTimerId);
    }

    const start = () => {
        if (!isGameOver) {
            createDoodler();
            createPlatforms();
            setInterval(() => {movePlatforms()}, 30);
            jump();
            // setInterval(() => jump(), 30);
        }
    }
    // attach to button
    start();
})
