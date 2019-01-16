class Cookie {
  public static setCookie(key, value, expires_days) {
    var exp = new Date();
    exp.setTime(exp.getTime() + expires_days * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + value + ";expires=" + exp;
  }

  public static getCookie(key): string {
    var arr;
    var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return arr[2];
    else
      return null;
  }

  public static clearCookie(key) {
    this.setCookie(key, '', -1);
  }
}