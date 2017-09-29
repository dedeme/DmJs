// Copyright 09-Sep-2017 ºDeme
// GNU General Public License - V3 <http://www.gnu.org/licenses/>

goog.provide("AuthV");

goog.require("Global");
goog.require("Dom0");
goog.require("github_dedeme.Captcha");

{
  const user = Ui.field("pass");
  const pass = Ui.pass("accept").att("id", "pass");
  const persistent = $("input")
    .att("type", "checkbox")
    .style("vertical-align: middle");
  const accept = $("input")
    .att("type", "button")
    .style("width:90px;")
    .att("id", "accept")
    .value(_("Accept"));

  const captcha = new github_dedeme.Captcha("JsDoc_auth", 3);

AuthV = class {
  /** @param {!Auth} auth */
  constructor (auth) {
    /**
     * @private
     * @const {!Auth}
     */
    this._auth = auth;

    /**
     * @private
     * @const {!github_dedeme.Captcha}
     */
    this._captcha = captcha;
  }

  /** @return {!github_dedeme.Captcha} */
  captcha () {
    return this._captcha
  }

  /**
   * @private
   * @return {!Domo}
   */
  body () {
    const auth = this._auth;
    const counter = captcha.counter();
    const counterLimit = captcha.counterLimit();

    accept.on("click", e => {
      if (counter > counterLimit && !captcha.match()) {
        alert(_("Grey squares checks are wrong"));
        location.assign("");
        return;
      }
      auth.accept(
        user.value().trim(),
        pass.value().trim(),
        persistent.checked()
      );
    });

    let rows = [
      $("tr")
        .add($("td")
          .style("padding: 10px 0px 0px 10px;text-align:right;")
          .html(_("User")))
        .add($("td").style("padding: 10px 10px 0px 10px;").add(user)),
      $("tr")
        .add($("td")
          .style("padding: 10px 0px 0px 10px;text-align:right;")
          .html(_("Password")))
        .add($("td").style("padding: 10px 10px 5px 10px;").add(pass)),
      $("tr")
        .add($("td")
          .att("colspan", 2)
          .style('border-top:1px solid #c9c9c9;' +
            "padding: 5px 10px 10px;text-align:right;")
          .add($("table")
            .style(
              "border-collapse : collapse;" +
              "border : 0px;" +
              "width : 100%;")
            .add($("tr")
              .add($("td").att("align", "center").att("colspan", 2)
                .add(persistent)
                .add($("span").html("&nbsp;" + _("Keep connected")))))
            .add($("tr")
              .add($("td")
                .add(Ui.link(auth.changeLanguage/**/).att("class", "link")
                  .html(Global.language() === "en" ? "ES" : "EN")))
              .add($("td").att("align", "right").add(accept)))))
    ];

    if (counter > 0) {
      rows.push(
        $("tr")
          .add($("td")
            .att("colspan", 2)
            .style('border-top:1px solid #c9c9c9;' +
              "padding: 10px 10px 10px;text-align:right;")
            .add($("table")
              .att("align", "center")
              .style("background-color: rgb(250, 250, 250);" +
                "border: 1px solid rgb(110,130,150);" +
                "font-family: sans;font-size: 14px;" +
                "padding: 4px;border-radius: 4px;")
              .add($("tr")
                .add($("td").html(_("Wrong password"))))))
      );
    }

    if (counter > counterLimit) {
      rows.push(
        $("tr")
          .add($("td").att("colspan", 2).att("align", "center")
            .add(captcha.make()))
      );
      rows.push(
        $("tr")
          .add($("td")
            .att("colspan", 2)
            .style("padding: 5px 0px 5px 10px;text-align:center;")
            .html(_("Check gray squares")))
      );
    }

    return $("table")
      .att("align", "center")
      .style(
        'background-color: #f8f8f8;' +
        "border-collapse: collapse;" +
        "padding: 10px;" +
        "border: 1px solid rgb(110,130,150);")
      .add($("tr")
        .add($("td")
          .att("colspan", 2)
          .style(
            'background-color:#e8e8e8;' +
            'border-bottom:1px solid #c9c9c9;' +
            "padding: 10px;" +
            'color:#505050;'
          )
          .html("<big><big><b>" + _("Login") + "</big></big></b>")))
      .addIt(It.from(rows));
  }

  show () {
    Dom0.show(
      $("div")
        .add($("div").klass("title").html(
          "&nbsp;<br>" + Global.app() + "<br>&nbsp;"))
        .add($("div").add(this.body()))
    );
    user.e().focus();
  }
}}

