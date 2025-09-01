if (ccsm === undefined) var ccsm = {};
Game.registerMod("ccsm", {
  info: {
    Name: "CCSM",
    Description: "Meant to replicate cookie clicker for steam"
  },
  init: function () {
    ccsm.version = "1.01";
    ccsm.active = 0;

    (async function () {
      let b = false,
        c = l("bigCookie");
      if (c) c.addEventListener("click", function () { if (b) return; b = true; });

      let d = l("supportSection");
      if (d) d.remove();

      let e = document.querySelectorAll(".listing.warning");
      if (e.length > 1) e[1].remove();

      let f = l("buffs");
      if (f) {
        f.style.marginTop = "20px";
        f.style.top = "16px";
      }

      let g = document.querySelector("#store").previousElementSibling;
      if (g) g.remove();

      let h = l("store");
      if (h) {
        h.style.position = "relative";
        h.style.marginTop = "0";
        h.style.zIndex = "100";
      }

      let i = l("heralds");
      if (i) document.body.appendChild(i);

      if (Game.wrapper) {
        Game.wrapper.className = "offWeb";
        window.dispatchEvent(new Event("resize"));
      }

      async function j() {
        try {
          let k = await fetch(
            "https://api.allorigins.win/get?url=" +
              encodeURIComponent(
                "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1454400"
              )
          ),
            m = await k.json(),
            n = JSON.parse(m.contents).response.player_count;
          if (typeof Game !== "undefined") {
            Game.heralds = Math.min(100, Math.floor(n / 100));
            let o = l("heraldsAmount");
            if (o) {
              o.textContent = Game.heralds;
              o.style.fontSize = "12px";
            }
          }
        } catch {}
      }

      j();
      setInterval(j, 1e4);

      if (typeof Game !== "undefined") {
        Game.externalDataLoaded = true;
        Game.recalculateGains = 1;
      }
    })();

    if (App) l("heralds").style.display = "inline-block";

    let J = l("heralds");
    J.style.paddingTop = "4px";
    J.style.position = "absolute";
    J.style.top = "0px";
    J.style.right = "0px";
    J.style.width = "28px";
    J.style.textAlign = "center";
    l("leftBeam").appendChild(J);
  }
});

(function(){
    showAds = false;
    Music = false;
    WindowFocus = true;
    Steam = {};
    App = Steam;
    Steam.cloud = false;
    Steam.cloudQuota = '?';
    Steam.allowSteamAchievs = true;
    Steam.mods = {};
    Steam.modList = [];
})();

(function(){
if(typeof Game==='undefined')return;

var locSafe = function(id,params){
    if(typeof loc==='function')return loc(id,params);
    if(typeof params!=='undefined'){
        if(Array.isArray(params)){
            var out=id;
            for(var i=0;i<params.length;i++) out=out.replace('%'+(i+1),params[i]);
            return out;
        }
        return id.replace('%1',params);
    }
    return id;
};

var log = Game.updateLog || '';

function insertAfterTitle(title,html){
    var needle = '<div class="title">' + title + '</div>';
    var i = log.indexOf(needle);
    if(i === -1) return false;
    var pos = i + needle.length;
    if(log.indexOf(html, pos) !== -1) return false;
    log = log.slice(0, pos) + html + log.slice(pos);
    return true;
}

var aboutInsert = '<div class="listing" style="font-weight:bold;font-style:italic;opacity:0.5;">' + locSafe("Note: links will open in your web browser.") + '</div>' + '<div class="listing">' + locSafe("Music by %1.",'<a href="https://twitter.com/C418" target="_blank">C418</a>') + '</div>';
if(log.indexOf('Music by') === -1) insertAfterTitle(locSafe("About"), aboutInsert);

insertAfterTitle('07/05/2023 - often imitated, never duplicated','<div class="listing">&bull; removed Discord rich presence support (plugin currently broken)</div>');
insertAfterTitle('31/05/2022 - a mind of its own','<div class="listing">&bull; new option to disable your game activity showing up in Discord</div><div class="listing">&bull; launch errors now provide the option to restart without mods</div>');

if(log.indexOf('18/12/2021 - work it') === -1){
    log += ('</div><div class="subsection update small"><div class="title">18/12/2021 - work it</div><div class="listing">&bull; added Steam Workshop support (lets you install mods and upload your own)</div><div class="listing">&bull; added Korean language support</div><div class="listing">&bull; added a few more features for the Steam build</div>');
}

log = log.replace(/<div class="listing block"[^>]*id="supportSection"[^>]*>[\s\S]*?<\/div>/, '');

Game.updateLog = log;
})();
