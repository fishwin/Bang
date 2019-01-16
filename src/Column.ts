class Column {
    public constructor(t: BallColor, x: number, y: number, w: number, h: number, background: GameBackGround, dieLine: number) {

        this._t = t;
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
        this._ball_radius = w * 8 / 10 / 2;
        this._ball_space = w * 1 / 10;
        this._background = background;
        this._dieLine = dieLine;
    }

    public generateABall(): void {
        let ball = new Ball(this._x + this._ball_space + this._ball_radius, this._y + this._ball_radius, this._ball_radius, this._t);
        ball.draw();
        this._background.addChild(ball)
        this._balls.push(ball);
        this._ball_count++;
    }

    public redrawAllBalls(): void {
        
        for (let i = 0; i < this._ball_count; i++) {
            if (this._balls[i]._valid) {
                this._balls[i].remove();
                this._balls[i].draw(this._balls[i].getY() + this._ball_step)
            }
        }
    }

    public clearOne() {
        for (let i = 0; i < this._ball_count; i++) {
            if (this._balls[i]._valid) {
                egret.log(this._t, "remove")
                this._background.removeChild(this._balls[i])
                this._balls[i]._valid = false
                SoundUtils.instance().playBallHit();
                this._background._score++;
                break;
            }
        }
    }

    public removeAll() {
        for (let i = 0; i < this._ball_count; i++) {
            if (this._balls[i]._valid) {
                this._background.removeChild(this._balls[i])
            }
        }
    }

    public judgeGameOver(): boolean {
        let gameOver = false;
        for (let i = 0; i < this._ball_count; i++) {
            if (this._balls[i]._valid) {
                if (this._balls[i].getY() > this._dieLine - this._ball_radius) {
                    gameOver = true;
                    break;
                }
            }
        }
        return gameOver;
    }

    public increaseStep() {
        this._ball_step += 0.1
        if (this._ball_step > 15) {
            this._ball_step = 15;
        }
    }

    private _x: number;
    private _y: number;
    private _w: number;
    private _h: number;
    private _t: number;
    private _balls: Ball[] = [];
    private _ball_radius: number;
    private _ball_space: number;
    private _ball_count: number = 0;
    private _ball_step: number = 5;
    private _background: GameBackGround;
    private _dieLine: number;
}

