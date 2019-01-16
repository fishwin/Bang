class GameBackGround extends egret.Sprite {
    public constructor() {
        super();
        this._stageWidth = egret.MainContext.instance.stage.stageWidth
        this._stageHeight = egret.MainContext.instance.stage.stageHeight
        this._settlement = new Settlement(this)
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
    }

    private onAddedToStage(event: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
        let bestScore = Cookie.getCookie("_BangBestS_");
        if (bestScore) {
            this._best = parseInt(bestScore)
        }

        egret.log("[onAddedToStage] 1,2: ", FacebookAd.InterstitialAdLoadState, FacebookAd.RewardedVideoAdLoadState)

        if (Main._WITHAD) {
            if (FacebookAd.InterstitialAdLoadState === 1) {
                FacebookAd.showInterstitialAd(this.onAdFinish)
            } else if (FacebookAd.RewardedVideoAdLoadState === 1) {
                FacebookAd.showRewardedVideoAd(this.onAdFinish)
            } else {
                this.drawBackGround();
            }
        } else {
            this.drawBackGround();
        }


    }

    private onAdFinish() {
        egret.log("[GameBackGround, onAdFinish] 1,2: ", FacebookAd.InterstitialAdLoadState, FacebookAd.RewardedVideoAdLoadState)
        this.drawBackGround();
    }

    private drawBackGround(): void {

        // 背景
        this._backGround = new egret.Shape();
        this._backGround.graphics.beginFill(0xaa11ff, 1);
        this._backGround.graphics.drawRect(0, 0, this._stageWidth, this._stageHeight);
        this._backGround.graphics.endFill();
        this.addChild(this._backGround);

        this._gameSceneX = this._stageWidth / 10;
        this._gameSceneY = this._stageHeight / 10;
        this._gameSceneWidth = this._stageWidth * 4 / 5;
        this._gameSceneHeight = this._stageHeight * 31 / 40;

        // 边界
        this._boundary = new egret.Shape();
        this._boundary.graphics.beginFill(0x222222, 0.8);
        this._boundary.graphics.drawRect(this._gameSceneX, this._gameSceneY, this._gameSceneWidth, this._gameSceneHeight);
        this._boundary.graphics.endFill();
        this.addChild(this._boundary);

        // 按钮
        let buttonSpace = this._stageWidth * 4 / 135
        let buttonRadius = this._stageWidth * 12 / 135
        let redButtonX = this._stageWidth / 10 + buttonRadius
        let redButtonY = this._stageHeight * 71 / 80 + buttonRadius


        this._redButton = new egret.Shape();
        this._redButton.graphics.beginFill(0xff0000, 1);
        this._redButton.graphics.drawCircle(redButtonX, redButtonY, buttonRadius);
        this._redButton.graphics.endFill();
        this.addChild(this._redButton);
        this._redButton.touchEnabled = true;

        this._yellowButton = new egret.Shape();
        this._yellowButton.graphics.beginFill(0xFFFF00, 1);
        this._yellowButton.graphics.drawCircle(redButtonX + buttonRadius * 2 + buttonSpace, redButtonY, buttonRadius);
        this._yellowButton.graphics.endFill();
        this.addChild(this._yellowButton);
        this._yellowButton.touchEnabled = true;


        this._blueButton = new egret.Shape();
        this._blueButton.graphics.beginFill(0x0000ff, 1);
        this._blueButton.graphics.drawCircle(redButtonX + buttonRadius * 4 + buttonSpace * 2, redButtonY, buttonRadius);
        this._blueButton.graphics.endFill();
        this.addChild(this._blueButton);
        this._blueButton.touchEnabled = true;


        this._greenButton = new egret.Shape();
        this._greenButton.graphics.beginFill(0x00ff00, 1);
        this._greenButton.graphics.drawCircle(redButtonX + buttonRadius * 6 + buttonSpace * 3, redButtonY, buttonRadius);
        this._greenButton.graphics.endFill();
        this.addChild(this._greenButton);
        this._greenButton.touchEnabled = true;

        this._redButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.colorButtonClickBegin, this);
        this._yellowButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.colorButtonClickBegin, this);
        this._greenButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.colorButtonClickBegin, this);
        this._blueButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.colorButtonClickBegin, this);

        this._redButton.addEventListener(egret.TouchEvent.TOUCH_END, this.colorButtonClick, this);
        this._yellowButton.addEventListener(egret.TouchEvent.TOUCH_END, this.colorButtonClick, this);
        this._greenButton.addEventListener(egret.TouchEvent.TOUCH_END, this.colorButtonClick, this);
        this._blueButton.addEventListener(egret.TouchEvent.TOUCH_END, this.colorButtonClick, this);

        this._seperateLine1 = new egret.Shape();
        this._seperateLine1.graphics.lineStyle(2, 0xffffff);
        this._seperateLine1.graphics.moveTo(this._gameSceneX + this._gameSceneWidth / 4, this._gameSceneY);
        this._seperateLine1.graphics.lineTo(this._gameSceneX + this._gameSceneWidth / 4, this._gameSceneY + this._gameSceneHeight);
        this.addChild(this._seperateLine1)

        this._seperateLine2 = new egret.Shape();
        this._seperateLine2.graphics.lineStyle(2, 0xffffff);
        this._seperateLine2.graphics.moveTo(this._gameSceneX + this._gameSceneWidth * 2 / 4, this._gameSceneY);
        this._seperateLine2.graphics.lineTo(this._gameSceneX + this._gameSceneWidth * 2 / 4, this._gameSceneY + this._gameSceneHeight);
        this.addChild(this._seperateLine2)

        this._seperateLine3 = new egret.Shape();
        this._seperateLine3.graphics.lineStyle(2, 0xffffff);
        this._seperateLine3.graphics.moveTo(this._gameSceneX + this._gameSceneWidth * 3 / 4, this._gameSceneY);
        this._seperateLine3.graphics.lineTo(this._gameSceneX + this._gameSceneWidth * 3 / 4, this._gameSceneY + this._gameSceneHeight);
        this.addChild(this._seperateLine3)

        this._staticScoreText = new egret.TextField();
        this._staticScoreText.text = "score:  ";
        this._staticScoreText.textColor = 0xffffff;
        this._staticScoreText.fontFamily = "SimHei";
        this._staticScoreText.x = this._gameSceneX + 50;
        this._staticScoreText.size = 50;
        this._staticScoreText.y = this._stageHeight / 30;
        // this.addChild(this._staticScoreText);

        this._scoreText = new egret.TextField();
        this._scoreText.text = this._score.toString();
        this._scoreText.textColor = 0xffffff;
        this._scoreText.fontFamily = "SimHei";
        this._scoreText.x = this._stageWidth / 2 - 15;
        this._scoreText.size = 70;
        this._scoreText.y = this._stageHeight / 31;
        this.addChild(this._scoreText);

        this._staticBestText = new egret.TextField();
        this._staticBestText.text = "best:  ";
        this._staticBestText.textColor = 0xffffff;
        this._staticBestText.fontFamily = "SimHei";
        this._staticBestText.x = this._scoreText.x + 140;
        this._staticBestText.size = 50;
        this._staticBestText.y = this._stageHeight / 30;
        // this.addChild(this._staticBestText);

        this._bestText = new egret.TextField();
        this._bestText.text = this._best.toString();
        this._bestText.textColor = 0xffffff;
        this._bestText.fontFamily = "SimHei";
        this._bestText.x = this._staticBestText.x + 130;
        this._bestText.size = 50;
        this._bestText.y = this._stageHeight / 30;
        //this.addChild(this._bestText);


        this._redColum = new Column(BallColor.RED, this._gameSceneX, this._gameSceneY, this._gameSceneWidth / 4,
            this._gameSceneHeight, this, this._gameSceneY + this._gameSceneHeight)
        this._yellowColum = new Column(BallColor.YELLOW, this._gameSceneX + this._gameSceneWidth / 4,
            this._gameSceneY, this._gameSceneWidth / 4, this._gameSceneHeight, this, this._gameSceneY + this._gameSceneHeight)
        this._blueColum = new Column(BallColor.BLUE, this._gameSceneX + this._gameSceneWidth * 2 / 4,
            this._gameSceneY, this._gameSceneWidth / 4, this._gameSceneHeight, this, this._gameSceneY + this._gameSceneHeight)
        this._greenColum = new Column(BallColor.GREEN, this._gameSceneX + this._gameSceneWidth * 3 / 4,
            this._gameSceneY, this._gameSceneWidth / 4, this._gameSceneHeight, this, this._gameSceneY + this._gameSceneHeight)


        this._timer = new egret.Timer(1000, 0);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this._timer.start();
        // this._timer.delay = 100
        egret.MainContext.instance.stage.frameRate = 60;
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
    }

    private timerFunc(evt: egret.Event) {
        let rannum = Math.floor(Math.random() * 4);
        let rannum2 = Math.floor(Math.random() * 4);
        let rannum3 = Math.floor(Math.random() * 4);
        egret.log("rannum: ", rannum, rannum2, rannum3)

        this.generateBalls(rannum)


        this._redColum.increaseStep();
        this._yellowColum.increaseStep();
        this._greenColum.increaseStep();
        this._blueColum.increaseStep();

        this.increaseGenerateV();
    }

    private increaseGenerateV() {
        this._timer.delay -= 20
        if (this._timer.delay < 400) {
            this._timer.delay = 400
        }
    }

    private enterFrame(evt: egret.Event) {
        this._redColum.redrawAllBalls();
        this._yellowColum.redrawAllBalls();
        this._greenColum.redrawAllBalls();
        this._blueColum.redrawAllBalls();

        if (this._redColum.judgeGameOver() || this._yellowColum.judgeGameOver() || this._greenColum.judgeGameOver() || this._blueColum.judgeGameOver()) {
            this.gameOver();
        }
    }

    private generateBalls(rannum: number) {
        switch (rannum) {
            case 0: { // red
                this._redColum.generateABall();
                break;
            }
            case 1: { // yellow
                this._yellowColum.generateABall();
                break;
            }
            case 2: { // green
                this._greenColum.generateABall();
                break;
            }
            case 3: { // blue
                this._blueColum.generateABall();
                break;
            }
        }

    }

    private colorButtonClick(event: egret.TouchEvent) {
        let buttonSpace = this._stageWidth * 4 / 135
        let buttonRadius = this._stageWidth * 12 / 135
        let redButtonX = this._stageWidth / 10 + buttonRadius
        let redButtonY = this._stageHeight * 71 / 80 + buttonRadius
        switch (event.target) {
            case this._redButton: {
                this._redButton.graphics.clear()
                this._redButton.graphics.beginFill(0xff0000, 1);
                this._redButton.graphics.drawCircle(redButtonX, redButtonY, buttonRadius);
                this._redButton.graphics.endFill();

                egret.log("red clear")
                this._redColum.clearOne();
                break;
            }
            case this._yellowButton: {
                this._yellowButton.graphics.clear()
                this._yellowButton.graphics.beginFill(0xFFFF00, 1);
                this._yellowButton.graphics.drawCircle(redButtonX + buttonRadius * 2 + buttonSpace, redButtonY, buttonRadius);
                this._yellowButton.graphics.endFill();

                egret.log("yellow clear")
                this._yellowColum.clearOne();
                break;
            }
            case this._greenButton: {
                this._greenButton.graphics.clear()
                this._greenButton.graphics.beginFill(0x00ff00, 1);
                this._greenButton.graphics.drawCircle(redButtonX + buttonRadius * 6 + buttonSpace * 3, redButtonY, buttonRadius);
                this._greenButton.graphics.endFill();

                egret.log("green clear")
                this._greenColum.clearOne();
                break;
            }
            case this._blueButton: {
                this._blueButton.graphics.clear()
                this._blueButton.graphics.beginFill(0x0000ff, 1);
                this._blueButton.graphics.drawCircle(redButtonX + buttonRadius * 4 + buttonSpace * 2, redButtonY, buttonRadius);
                this._blueButton.graphics.endFill();

                egret.log("blue clear")
                this._blueColum.clearOne();
                break;
            }
            default: {
                egret.log("event.target is error: ", event.target)
            }
        }

        this._scoreText.text = this._score.toString();
        if (this._score > this._best) {
            this._best = this._score;
            this._bestText.text = this._best.toString();
            Cookie.setCookie("_BangBestS_", this._best, 100)
        }
    }

    private gameOver() {
        Cookie.setCookie("_BangBestS_", this._best, 100)
        this._timer.stop();
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);

        this._redColum.removeAll();
        this._yellowColum.removeAll();
        this._greenColum.removeAll();
        this._blueColum.removeAll();
        this._redColum = new Column(BallColor.RED, this._gameSceneX, this._gameSceneY, this._gameSceneWidth / 4,
            this._gameSceneHeight, this, this._gameSceneY + this._gameSceneHeight)
        this._yellowColum = new Column(BallColor.YELLOW, this._gameSceneX + this._gameSceneWidth / 4,
            this._gameSceneY, this._gameSceneWidth / 4, this._gameSceneHeight, this, this._gameSceneY + this._gameSceneHeight)
        this._blueColum = new Column(BallColor.BLUE, this._gameSceneX + this._gameSceneWidth * 2 / 4,
            this._gameSceneY, this._gameSceneWidth / 4, this._gameSceneHeight, this, this._gameSceneY + this._gameSceneHeight)
        this._greenColum = new Column(BallColor.GREEN, this._gameSceneX + this._gameSceneWidth * 3 / 4,
            this._gameSceneY, this._gameSceneWidth / 4, this._gameSceneHeight, this, this._gameSceneY + this._gameSceneHeight)

        //alert("Game Over! Restart Game?");
        //this.restart();
        this._settlement = new Settlement(this);
        this.addChild(this._settlement);
        this._score = 0;
        this._scoreText.text = this._score.toString();
    }

    public restart() {
        this.removeChild(this._settlement);


        this._timer.start();

        egret.MainContext.instance.stage.frameRate = 60;
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        this._timer.delay = 1000;

    }

    private colorButtonClickBegin(event: egret.TouchEvent) {
        let buttonSpace = this._stageWidth * 4 / 135
        let buttonRadius = this._stageWidth * 12 / 135
        let redButtonX = this._stageWidth / 10 + buttonRadius
        let redButtonY = this._stageHeight * 71 / 80 + buttonRadius
        switch (event.target) {
            case this._redButton: {
                this._redButton.graphics.clear()
                this._redButton.graphics.beginFill(0xff0000, 0.5);
                this._redButton.graphics.drawCircle(redButtonX, redButtonY, buttonRadius);
                this._redButton.graphics.endFill();
                break;
            }
            case this._yellowButton: {
                this._yellowButton.graphics.clear()
                this._yellowButton.graphics.beginFill(0xFFFF00, 0.5);
                this._yellowButton.graphics.drawCircle(redButtonX + buttonRadius * 2 + buttonSpace, redButtonY, buttonRadius);
                this._yellowButton.graphics.endFill();
                break;
            }
            case this._greenButton: {
                this._greenButton.graphics.clear()
                this._greenButton.graphics.beginFill(0x00ff00, 0.5);
                this._greenButton.graphics.drawCircle(redButtonX + buttonRadius * 6 + buttonSpace * 3, redButtonY, buttonRadius);
                this._greenButton.graphics.endFill();
                break;
            }
            case this._blueButton: {
                this._blueButton.graphics.clear()
                this._blueButton.graphics.beginFill(0x0000ff, 0.5);
                this._blueButton.graphics.drawCircle(redButtonX + buttonRadius * 4 + buttonSpace * 2, redButtonY, buttonRadius);
                this._blueButton.graphics.endFill();
                break;
            }
            default: {
                egret.log("event.target is error: ", event.target)
            }
        }
    }


    private _boundary: egret.Shape;
    private _backGround: egret.Shape;
    private _redButton: egret.Shape;
    private _yellowButton: egret.Shape;
    private _blueButton: egret.Shape;
    private _greenButton: egret.Shape;
    private _stageWidth: number;
    private _stageHeight: number;

    private _gameSceneX: number;
    private _gameSceneY: number;
    private _gameSceneWidth: number;
    private _gameSceneHeight: number;

    private _seperateLine1: egret.Shape;
    private _seperateLine2: egret.Shape;
    private _seperateLine3: egret.Shape;

    private _redColum: Column;
    private _yellowColum: Column;
    private _greenColum: Column;
    private _blueColum: Column;

    private _timer: egret.Timer;

    private _staticScoreText: egret.TextField;
    private _scoreText: egret.TextField;
    public _score: number = 0;

    private _staticBestText: egret.TextField;
    private _bestText: egret.TextField;
    private _best: number = 0;
    private _settlement: Settlement;
}


enum BallColor { RED, YELLOW, GREEN, BLUE };