class SoundBase extends egret.DisplayObjectContainer {

    public constructor(url?: string) {
        super();
        if (url)
            this._soundURL = url;

        this._sound = new egret.Sound();
        this.loadSound();

    }

    private _sound: egret.Sound;

    private _soundURL: string = "bgSound";

    private _soundChannel: egret.SoundChannel;
    private _positon: number = 0;
    private _loop: number = 1;
    private _status: number = 0;

    private loadSound() {
        if (RES.getRes(this._soundURL)) {
            this._sound = RES.getRes(this._soundURL);
        } else {
            this._sound.once(egret.Event.COMPLETE, this.loadComplete, this);
            this._sound.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
            this._sound.load(this._soundURL);
        }
    }

    private loadComplete(e: egret.Event) {
        this._status = 3;
        var waring: string = "Load sound ok";
        egret.log(waring);
        this._sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this)
        this.dispatchEventWith(egret.Event.COMPLETE, false, waring);
    }

    private onLoadErr(e: egret.IOErrorEvent) {
        this._status = 4;
        var waring: string = "Load sound error:" + this._soundURL;
        egret.log(waring);
        this._sound.removeEventListener(egret.Event.COMPLETE, this.loadComplete, this);
        this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR, false, waring);
    }

    public setUrl(url: string) {
        this._soundURL = url;
        this.loadSound();
    }

    private looped(e: egret.Event) {
        // console.log("looped");
        this._soundChannel = null;
        this._positon = 0;
        this._status = 0;
        var waring: string = "already looped";
        if (this._loop >= 0) {
            this.dispatchEventWith(egret.Event.SOUND_COMPLETE, false, waring);
        } else {
            this.play();
        }
    }

    public getStatus() {
        return this._status;
    }

    public setVolume(volume: number) {
        // console.log(this._status);
        if (1 === this._status)
            this._soundChannel.volume = volume / 100;
    }

    public showPosition(): number {
        if (1 === this._status)
            this._positon = this._soundChannel.position;
        return this._positon;
    }

    public play() {
        if (4 === this._status) {
            this.loadSound();
            return;
        }
        this._status = 1;
        if (this._soundChannel)
            this._soundChannel.stop();

        this._soundChannel = this._sound.play(this._positon, 1);

        this._soundChannel.once(egret.Event.SOUND_COMPLETE, this.looped, this);

        return this._status;
    }

    public setLoop(loop: number = 1): number {
        this._loop = loop;

        return loop;
    }

    public pause() {
        var temp = this._status;
        if (1 === temp) {
            this._positon = this._soundChannel.position;
            this._soundChannel.stop();
            this._status = 2;
        }
        egret.log(this._positon);
        return temp;
    }

    public resume() {
        var temp = this._status;
        if (2 === temp) {
            this.play();

        }
        egret.log(this._positon);
        return temp;
    }

    public stop() {
        if (this._soundChannel) {
            this._status = 0;
            this._positon = 0;
            this._soundChannel.stop();
            this._soundChannel = null;
        }
    }
}