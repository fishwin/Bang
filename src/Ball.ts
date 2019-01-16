class Ball extends egret.Sprite {
    public constructor(x: number, y: number, radius: number, t: BallColor) {
        super();
        this._x = x;
        this._y = y;
        this._r = radius;
        this._t = t;

        switch (this._t) {
            case BallColor.RED: {
                this._color = 0xff0000;
                break;
            }
            case BallColor.YELLOW: {
                this._color = 0xFFFF00;
                break;
            }
            case BallColor.GREEN: {
                this._color = 0x00ff00;
                break;
            }
            case BallColor.BLUE: {
                this._color = 0x0000ff;
                break;
            }
        }
    }

    public clear() {
        this.graphics.clear();
        // todo(粒子动画)
    }

    public remove(): void {
        this.graphics.clear();
    }

    public draw(y: number = -1): void {
        this.graphics.beginFill(this._color);
        this.graphics.lineStyle(2, this._color);
        if (y > 0) {
            this.graphics.drawCircle(this._x, y, this._r);
            this._y = y;
        } else {
            this.graphics.drawCircle(this._x, this._y, this._r);
        }

        this.graphics.endFill();
    }

    public getY(): number {
        return this._y
    }

    private _x: number;
    private _y: number;
    private _r: number;
    private _t: BallColor;
    private _color: number;
    public _valid :boolean = true;

}