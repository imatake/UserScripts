// ==UserScript==
// @name        Annict 関連作品
// @description Annict 作品ページで関連作品の一覧を表示します。
// @namespace   imatake.github.io
// @include     https://annict.com/works/*
// @exclude     https://annict.com/works/*/episodes
// @exclude     https://annict.com/works/*/episodes/*
// @exclude     https://annict.com/works/*/characters
// @exclude     https://annict.com/works/*/staffs
// @author      imatake
// @version     1.00.20170323
// @license     MIT License
// @grant       none
// ==/UserScript==
(function () {
  //console.log('Related works');
  // 関連作品マップ
  var map = [
    {
      997: '進撃の巨人',
      4209: '劇場版「進撃の巨人」',
      4924: '進撃の巨人 Season 2',
    },
    {
      4266: '冴えない彼女の育てかた',
      4725: '冴えない彼女の育てかた♭',
    },
    {
      235: '有頂天家族',
      5031: '有頂天家族2',
    },
    {
      4616: '僕のヒーローアカデミア',
      5083: '僕のヒーローアカデミア（第2期）',
    },
    {
      4247: 'ダンジョンに出会いを求めるのは間違っているだろうか',
      5137: 'ソード・オラトリア',
    },
    {
      2321: '四畳半神話大系',
      5162: '映画 夜は短し歩けよ乙女',
    },
    {
      1513: '夏目友人帳',
      1174: '続 夏目友人帳',
      1514: '夏目友人帳 参',
      1515: '夏目友人帳 肆',
      3929: '夏目友人帳 いつかゆきのひに',
      4322: '夏目友人帳 ニャンコ先生とはじめてのおつかい',
      4808: '夏目友人帳 伍',
      5139: '夏目友人帳 陸',
    },
    {
      2481: '笑ゥせぇるすまん',
      5087: '笑ゥせぇるすまん NEW',
    },
    {
      695: '剣風伝奇ベルセルク',
      3649: 'ベルセルク 黄金時代篇Ⅰ 覇王の卵',
      4829: 'ベルセルク 黄金時代篇II ドルドレイ攻略',
      4830: 'ベルセルク 黄金時代篇III 降臨',
      4635: 'ベルセルク (2016年)',
      5044: 'ベルセルク（第2期）',
    },
    {
      4161: '神撃のバハムート GENESIS',
      4621: '神撃のバハムート マナリアフレンズ',
      5115: '神撃のバハムート VIRGIN SOUL',
    },
    {
      660: '黒子のバスケ',
      661: '黒子のバスケ 第2期',
      4269: '黒子のバスケ 第3期',
      5133: '黒子のバスケ ウインターカップ総集編 ～影と光～',
      5134: '黒子のバスケ ウインターカップ総集編 ～涙の先へ～',
      5135: '黒子のバスケ ウインターカップ総集編 ～扉の向こう～',
      4985: '劇場版 黒子のバスケ LAST GAME',
    },
    {
      5067: '名探偵コナン から紅の恋歌',
    },
    {
      4472: 'スタミュ 高校星歌劇',
      5042: 'スタミュ（第2期）',
    },
    {
      //53: 'アイドルマスター XENOGLOSSIA',
      16: 'THE IDOLM@STER',
      2494: 'THE iDOLM@STER Live For You!',
      4113: 'THE IDOLM@STER MOVIE 輝きの向こう側へ！',
      3814: 'ぷちます！-プチ・アイドルマスター-',
      3951: 'ぷちます!!-プチプチ・アイドルマスター-',
      4256: 'アイドルマスターシンデレラガールズ',
      4430: 'アイドルマスター シンデレラガールズ 2nd SEASON',
      5193: 'アイドルマスター シンデレラガールズ劇場',
    },
    {
      4277: '境界のRINNE（第1シリーズ）',
      4687: '境界のRINNE（第2シリーズ）',
      5041: '境界のRINNE（第3シリーズ）',
    },
    {
      4612: 'KING OF PRISM by PrettyRhythm',
      4957: 'KING OF PRISM-PRIDE the HERO-',
    },
    {
      4898: '信長の忍び',
      5184: '信長の忍び～伊勢・金ヶ崎篇～',
    },
    {
      2301: '遊☆戯☆王',
      2302: '遊☆戯☆王5D’s',
      2303: '遊☆戯☆王ZEXAL',
      2304: '遊☆戯☆王デュエルモンスターズ',
      2305: '遊☆戯☆王デュエルモンスターズGX',
      3292: '劇場版 遊☆戯☆王',
      3750: '劇場版 遊☆戯☆王 ～超融合！時空を越えた絆～',
      3751: '遊☆戯☆王デュエルモンスターズ 光のピラミッド',
      3967: '遊☆戯☆王ARC‐V',
      4014: '遊☆戯☆王 ZEXAL II',
      4820: '遊☆戯☆王 THE DARK SIDE OF DIMENSIONS',
      5187: '遊☆戯☆王VRAINS',
    },
    {
      4484: 'モンスターストライク',
      5186: 'モンスターストライク セカンドシーズン',
    },
    {
      4314: '昭和元禄落語心中',
      4918: '昭和元禄落語心中〜助六再び篇〜',
    },
    {
      // 科学アドベンチャーシリーズ でまとめちゃうのはまとめすぎ？
      // CHAOS;HEAD と CHAOS;CHILD は一緒でも言い気がするけど…
      865: 'STEINS;GATE',
      3329: '劇場版 Steins;Gate 負荷領域のデジャヴ',
      4225: 'Steins;Gate 聡明叡智のコグニティブ・コンピューティング',
      2429: 'ROBOTICS;NOTES',
      358: 'CHAOS;HEAD',
      4901: 'CHAOS;CHILD',
    },
    {
      1166: 'ソードアート・オンライン',
      4027: 'ソードアート・オンライン Extra Edition',
      4093: 'ソードアート・オンラインII',
      4709: '劇場版 ソードアート・オンライン -オーディナル・スケール-',
    },
    {
      4547: 'この素晴らしい世界に祝福を！',
      4902: 'この素晴らしい世界に祝福を！2',
    },
    {
      4632: 'コチンPa!',
      5064: 'コチンPa!2nd',
    },
    {
      1860: 'Free!',
      4100: 'Free!-Eternal Summer-',
      4573: '映画 ハイ☆スピード！－Free! Starting Days－',
    },
  ]; //
  var url = content.document.location + ''; //console.log('url=' + url);
  var re = /^https\:\/\/annict\.com\/works\/(\d+)/;
  var m = re.exec(url);
  var wid = m ? m[1] : ''; //console.log('wid=' + wid);
  var items = undefined;
  for (var mi1 in map) for (var mi2 in map[mi1]) if (mi2 == wid) items = map[mi1];
  //console.log(items);
  if (items) { // 関連作品の表示
    var panel = $('div.c-subnav') [0].parentNode;
    var head = document.createElement('h2');
    head.className = 'h4 text-center my-2 font-weight-bold';
    head.appendChild(document.createTextNode('関連作品'));
    panel.appendChild(head);
    var body = document.createElement('div');
    body.className = 'c-card container mt-1 py-1';
    panel.appendChild(body);
    for (var rwid in items) { // 関連作品
      if (wid == rwid) continue;
      var item = document.createElement('div');
      //item.className = 'row mb-1';
      var link = document.createElement('a');
      link.href = 'https://annict.com/works/' + rwid;
      link.appendChild(document.createTextNode(items[rwid]));
      item.appendChild(link);
      body.appendChild(item);
    }
  }
  { // エピソード表示数の制限
    var cut = 1;
    $('table.p-episodes-table>>tr').each(function () {
      //console.log('row=' + $(this));
      if (cut++ > 5) $(this) [0].style.display = 'none';
    });
  }
}) ();
