class FacebookAd {
    public constructor() {

    }

    public static isSupportedAPI(apiName: string): boolean {
        if (this.supportAPIs.length === 0)
            this.supportAPIs = FBInstant.getSupportedAPIs();
        for (let i = 0; i < this.supportAPIs.length; ++i) {
            if (this.supportAPIs[i] === apiName) {
                return true;
            }
        }
        return false;
    }

    public static preLoadInterstitialAd(successFunc: Function) {
        if (!this.isSupportedAPI("getInterstitialAdAsync")) {
            egret.log("this.supportAPIs: ", this.supportAPIs)
            return
        }
        FBInstant.getInterstitialAdAsync(
            this.InterstitialAdPlaceID, // Your Ad Placement Id
        ).then(function (interstitial) {
            // Load the Ad asynchronously
            this.preloadedInterstitial = interstitial;
            return this.preloadedInterstitial.loadAsync();
        }).then(function () {
            egret.log('Interstitial preloaded')
            successFunc();
        }).catch(function (err) {
            egret.error('Interstitial failed to preload: ' + err.message);
        });
    }

    public static showInterstitialAd(successFunc: Function) {
        this.preloadedInterstitial.showAsync()
            .then(function () {
                // Perform post-ad success operation
                successFunc();
                egret.log('Interstitial ad finished successfully');
            })
            .catch(function (e) {
                egret.error(e.message);
            });
    }

    public static preLoadRewardedVideoAd(successFunc: Function) {
        if (!this.isSupportedAPI("getRewardedVideoAsync")) {
            egret.log("this.supportAPIs: ", this.supportAPIs)
            return
        }
        FBInstant.getRewardedVideoAsync(
            this.RewardedVideoAdPlaceID, // Your Ad Placement Id
        ).then(function (rewarded) {
            // Load the Ad asynchronously
            this.preloadedRewardedVideo = rewarded;
            return this.preloadedRewardedVideo.loadAsync();
        }).then(function () {
            egret.log('Rewarded video preloaded')
            successFunc();
        }).catch(function (err) {
            egret.error('Rewarded video failed to preload: ' + err.message);
        });
    }

    public static showRewardedVideoAd(successFunc: Function) {
        this.preloadedRewardedVideo.showAsync()
            .then(function () {
                // Perform post-ad success operation
                successFunc();
                egret.log('Rewarded video watched successfully');
            })
            .catch(function (e) {
                egret.error(e.message);
            });
    }

    private static preloadedInterstitial: any;
    private static preloadedRewardedVideo: any;

    private static InterstitialAdPlaceID: string = "358096418024495_358716824629121"
    private static RewardedVideoAdPlaceID: string = "358096418024495_363907864110017"

    public static InterstitialAdLoadState: number = 0;  // 0 no 1 yes
    public static RewardedVideoAdLoadState: number = 0;  // 0 no 1 yes

    private static supportAPIs: string[] = [];
}