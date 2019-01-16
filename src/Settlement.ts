class Settlement extends egret.Sprite {
    public constructor(backgorund: GameBackGround) {
        super();
        this._back = backgorund
        this._stageWidth = egret.MainContext.instance.stage.stageWidth
        this._stageHeight = egret.MainContext.instance.stage.stageHeight
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
    }

    private onAddedToStage(event: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
        this.Init();
    }

    private Init(): void {
        // 背景
        this._backGround = new egret.Shape();
        this._backGround.graphics.beginFill(this._backColor, 1);
        this._backGround.graphics.drawRect(0, 0, this._stageWidth, this._stageHeight);
        this._backGround.graphics.endFill();
        this.addChild(this._backGround);

        this._textScore = new egret.TextField();
        this._textScore.text = this._back._score.toString();
        this._textScore.textColor = this._textColor;
        this._textScore.fontFamily = "SimHei";
        this._textScore.x = this._stageWidth / 2 - 40;
        this._textScore.size = 100;
        this._textScore.y = this._stageHeight / 5;
        this._textScore.bold = true;
        this.addChild(this._textScore);

        this._restartButton = new egret.Shape();
        this._restartButton.graphics.beginFill(this._buttonColor, 1);
        this._restartButton.graphics.drawRect(this._stageWidth / 4, this._textScore.y + 150, this._stageWidth / 2, 100);
        this._restartButton.graphics.endFill();
        this.addChild(this._restartButton);
        this._restartButton.touchEnabled = true;

        this._textRestart = new egret.TextField();
        this._textRestart.text = "RESTART";
        this._textRestart.textColor = this._textColor;
        this._textRestart.fontFamily = "SimHei";
        this._textRestart.x = this._stageWidth / 3 + 15;
        this._textRestart.size = 50;
        this._textRestart.y = this._textScore.y + 150 + 20;
        this.addChild(this._textRestart);


        this._shareButton = new egret.Shape();
        this._shareButton.graphics.beginFill(this._buttonColor, 1);
        this._shareButton.graphics.drawRect(this._stageWidth / 4, this._textRestart.y + 120, this._stageWidth / 2, 100);
        this._shareButton.graphics.endFill();
        this.addChild(this._shareButton);
        this._shareButton.touchEnabled = true;


        this._textShare = new egret.TextField();
        this._textShare.text = "SHARE";
        this._textShare.textColor = this._textColor;
        this._textShare.fontFamily = "SimHei";
        this._textShare.x = this._stageWidth / 3 + 40;
        this._textShare.size = 50;
        this._textShare.y = this._textRestart.y + 120 + 20;
        this.addChild(this._textShare);

        this._restartButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.restartButtonClickBegin, this);
        this._shareButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shareButtonClickBegin, this);

        this._restartButton.addEventListener(egret.TouchEvent.TOUCH_END, this.restartButtonClick, this);
        this._shareButton.addEventListener(egret.TouchEvent.TOUCH_END, this.shareButtonClick, this);
    }

    private restartButtonClickBegin(event: egret.TouchEvent) {
        this._restartButton.graphics.clear()
        this._restartButton.graphics.beginFill(this._buttonColor, 0.5);
        this._restartButton.graphics.drawRect(this._stageWidth / 4, this._textScore.y + 150, this._stageWidth / 2, 100);
        this._restartButton.graphics.endFill();
    }

    private shareButtonClickBegin(event: egret.TouchEvent) {
        this._shareButton.graphics.clear()
        this._shareButton.graphics.beginFill(this._buttonColor, 0.5);
        this._shareButton.graphics.drawRect(this._stageWidth / 4, this._textRestart.y + 120, this._stageWidth / 2, 100);
        this._shareButton.graphics.endFill();
    }

    private restartButtonClick(event: egret.TouchEvent) {
        this._restartButton.graphics.clear()
        this._restartButton.graphics.beginFill(this._buttonColor, 1);
        this._restartButton.graphics.drawRect(this._stageWidth / 4, this._textScore.y + 150, this._stageWidth / 2, 100);
        this._restartButton.graphics.endFill();

        egret.log("[restartButtonClick] 1,2: ", FacebookAd.InterstitialAdLoadState, FacebookAd.RewardedVideoAdLoadState)

        if (Main._WITHAD) {
            if (FacebookAd.RewardedVideoAdLoadState === 1) {
                FacebookAd.showRewardedVideoAd(this.onAdFinish)
            } else if (FacebookAd.InterstitialAdLoadState === 1) {
                FacebookAd.showInterstitialAd(this.onAdFinish)
            } else {
                this._back.restart();
            }
        } else {
            this._back.restart();
        }

    }

    private onAdFinish() {
        egret.log("[Settlement, onAdFinish] 1,2: ", FacebookAd.InterstitialAdLoadState, FacebookAd.RewardedVideoAdLoadState)
        this._back.restart();
    }

    private shareButtonClick(event: egret.TouchEvent) {
        this._shareButton.graphics.clear()
        this._shareButton.graphics.beginFill(this._buttonColor, 1);
        this._shareButton.graphics.drawRect(this._stageWidth / 4, this._textRestart.y + 120, this._stageWidth / 2, 100);
        this._shareButton.graphics.endFill();
    }

    private _backGround: egret.Shape;
    private _stageWidth: number;
    private _stageHeight: number;

    private _textScore: egret.TextField;
    private _textRestart: egret.TextField;
    private _textShare: egret.TextField;
    private _restartButton: egret.Shape;
    private _shareButton: egret.Shape;

    private _back: GameBackGround;

    private _backColor: number = 0x483D8B;
    private _buttonColor: number = 0xDAA520;
    private _textColor: number = 0xF0F0F0;
}