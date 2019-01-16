/**
 * Created by Administrator on 2014/9/22.
 */
class SoundUtils {

    private static _instance: SoundUtils;

    public static instance(): SoundUtils {
        return this._instance == null ? this._instance = new SoundUtils() : this._instance;
    }

    constructor() {
        if (SoundUtils._instance != null)
            throw new Error("singleton");
    }

    private ball_hit_sound: SoundBase;
    private button_clik_sound: SoundBase;

    public initSound(): void {
        this.ball_hit_sound = new SoundBase("ball_hit_mp3");
        this.button_clik_sound = new SoundBase("button_clik_mp3");
    }


    private now: number;
    public playBallHit(): void {
        this.ball_hit_sound.play();
    }
    public playButtonClik(): void {
        this.button_clik_sound.play();
    }
}