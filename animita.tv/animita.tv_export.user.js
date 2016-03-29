// ==UserScript==
// @name        あにみた！エクスポート
// @description チェックイン・コメントをCSV形式でエクスポートします。設定(http://animita.tv/mypage/setting)もエクスポートボタンが追加されます。チェックインした作品数が多いと正確にエクスポートできません（チェックイン履歴にすべて表示されないため）。
// @namespace   imatake.github.io
// @include     http://animita.tv/mypage/setting
// @version     1.00.20160329
// @icon        data:image/gif;base64,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
// @grant       none
// ==/UserScript==
(function () {
  //
  var ul = document.createElement('ul');
  ul.className = 'ui-listview ui-listview-inset ui-corner-all ui-shadow';
  ul.attributes['data-inset'] = 'true';
  ul.attributes['data-role'] = 'listview';
  var lih = ul.appendChild(document.createElement('li'));
  lih.className = 'ui-li ui-li-divider ui-bar-b ui-corner-top';
  lih.attributes['data-role'] = 'list-divider';
  lih.attributes['role'] = 'heading';
  lih.textContent = 'チェックイン/コメント エクスポート'
  var lif = ul.appendChild(document.createElement('li'));
  lif.className = 'ui-li ui-li-static ui-body-a ui-corner-bottom';
  //lif.textContent = 'エクスポート!!'
  //
  lif.appendChild(createButton('チェックイン作品一覧', exportCheckinProduct));
  lif.appendChild(createButton('チェックイン話数一覧', exportCheckinEpisode));
  lif.appendChild(createButton('コメント一覧', exportComment));
  //
  var fm = $('form#edit_form') [0];
  fm.parentNode.insertBefore(ul, fm.nextElementSibling);
  ////
  function createButton(nm, func) { // エクスポート処理ボタンの作成
    var btn = document.createElement('a');
    btn.className = 'ui-btn ui-btn-up-a ui-btn-inline ui-shadow ui-btn-corner-all ui-mini';
    btn.onclick = function () {
      //console.info('Button OnClick');
      btn.onclick = null;
      btn.firstChild.firstChild.textContent = nm + ' 作成中…';
      btn.href = 'data:text/csv,' + encodeURIComponent(func());
      btn.download = 'あにみた！ ' + nm + '.csv';
      btn.firstChild.firstChild.textContent = nm + ' を保存';
    };
    var inner = btn.appendChild(document.createElement('span'));
    inner.className = 'ui-btn-inner ui-btn-corner-all'
    var text = inner.appendChild(document.createElement('span'));
    text.className = 'ui-btn-text'
    text.textContent = nm + ' を作成する';
    return btn;
  }
  function exportCheckinProduct() { // チェックイン作品一覧
    return exportCheckin(false);
  }
  function exportCheckinEpisode() { // チェックイン話数一覧
    return exportCheckin(true);
  }
  function exportCheckin(episode) { // チェックイン一覧
    var csv = episode ? 'PID,product title,EID,num,episode title,registered,product URL,episode URL\r\n' : 'PID,product title,URL\r\n';
    //csv += buildDataCheckin('http://animita.tv/product/4335', '4335', 'アクエリオンロゴス');
    //csv += buildDataCheckin('http://animita.tv/product/4252', '4252', '食戟のソーマ');
    //csv += buildDataCheckin('http://animita.tv/product/4165', '4165', '新妹魔王の契約者'); // OVA未
    //csv += buildDataCheckin('http://animita.tv/product/3886', '3886', 'アオハライド'); // OVA未
    //csv += buildDataCheckin('http://animita.tv/product/26', '26', '宇宙兄弟'); // 90、引越・開始特番未
    //csv += buildDataCheckin('http://animita.tv/product/4015', '4015', '翠星のガルガンティア～めぐる航路、遥か～');
    //csv += buildDataCheckin('http://animita.tv/product/1081', '1081', '名探偵コナン');
    csv += buildListCheckin(episode, false, '/mypage/product_list/checkin/now');
    csv += buildListCheckin(episode, false, '/mypage/product_list/checkin/past');
    csv += buildListCheckin(episode, true, '/mypage/product_list/product_checkin/now');
    csv += buildListCheckin(episode, true, '/mypage/product_list/product_checkin/past');
    return csv;
  }
  function buildListCheckin(episode, product, url) {
    //console.info('buildListCheckin url=' + url);
    var csv = '';
    var data = syncGet(url);
    var re = /<a.*href="(\/product\/([0-9]+))"[\s\S\n]*?class="checkin_title">(.+?)<\/span>/gim;
    var m;
    while ((m = re.exec(data))) {
      //console.info(m);
      var purl = m[1];
      var pid = m[2];
      var pnm = m[3];
      if (pid == '1') {
        // あにみた！ご意見box を除く
      } 
      else if (!episode) {
        csv += pid + ',' + csvescape(pnm) + ',http://animita.tv' + purl + '\r\n';
      } else if (product) {
        csv += pid + ',' + csvescape(pnm) + ',,,,,http://animita.tv' + purl + ',\r\n';
      } else {
        //csv += m2[1] + '\r\n';
        csv += buildDataCheckin(purl, pid, pnm);
      }
    }
    return csv;
  }
  function buildDataCheckin(url, pid, pnm) {
    //console.info('buildDataCheckin url=' + url);
    var csv = '';
    var data = syncGet(url);
    //console.log(data.length);
    var r2 = /<a href="(http:\/\/animita.tv\/episode\/[0-9]+\/([0-9]+))"[\s\S\n]*?\t*(.+?)&nbsp;(.*)\n[\s\S\n]*?<br \/><span class="f10">(.*?)<\/span>?[\s\S\n]*?<\/a>/gim;
    var m2;
    var r1 = /<li data-icon="arrow-r">[\s\S\n]*?<\/li>/gim;
    var m1 = data.match(r1);
    for (var i = 0; i < m1.length; i++) {
      while ((m2 = r2.exec(m1[i]))) {
        csv += pid + ','; // PID
        csv += csvescape(pnm) + ','; // product title
        csv += (m2[2] ? m2[2] : '') + ','; // EID
        csv += csvescape(m2[3]) + ','; // num
        csv += csvescape(m2[4]) + ','; // episode title
        csv += m2[5] + ','; // registered
        csv += 'http://animita.tv' + url + ','; // product URL
        csv += m2[1] + '\r\n'; // episode URL
      }
    }
    return csv;
  }
  function exportComment() { // コメント一覧
    var csv = 'PID,product title,EID,num,episode title,CID,comment,registered,URL\r\n';
    //csv += buildDataComment('/mypage/log_detail/comment/4009');
    csv += buildListComment('/mypage/product_list/comment/now');
    csv += buildListComment('/mypage/product_list/comment/past');
    csv += buildListComment('/mypage/product_list/product_comment/now');
    csv += buildListComment('/mypage/product_list/product_comment/past');
    return csv;
  }
  function buildListComment(url) {
    //console.info('buildListComment url=' + url);
    var csv = '';
    var data = syncGet(url);
    var re = /href="(\/mypage\/log_detail\/(?:product_)?comment\/[0-9]+)"/gim;
    var m;
    while ((m = re.exec(data))) {
      //console.info(m);
      if (m[1] != '/mypage/log_detail/comment/1') {
        csv += buildDataComment(m[1]);
      }
    }
    return csv;
  }
  function buildDataComment(url) {
    //console.info('buildDataComment url=' + url);
    var csv = '';
    var data = syncGet(url);
    var re = /<a.*?href="(\/(episode|product)\/comment\/([0-9]+)(?:\/([0-9]+))?\/([0-9]+))"[\s\S\n]*?<span class="log_comment_title">(.+?)<\/span>(?:[\s\S\n]*?<p class="log_comment_subtitle">(.+?)\t*&nbsp;「?(.+?)」?<\/p>)?[\s\S\n]*?<p>「?([\s\S\n]*?)」?<\/p>[\s\S\n]*?<p class="comment_date">([-: 0-9]+)<\/p>[\s\S\n]*?<\/a>/gim;
    var m;
    while ((m = re.exec(data))) {
      //console.info(m);
      csv += m[3] + ','; // PID
      csv += csvescape(m[6]) + ','; // product title
      csv += (m[4] ? m[4] : '') + ','; // EID
      csv += csvescape(m[7]) + ','; // num
      csv += csvescape(m[8]) + ','; // episode title
      csv += m[5] + ','; // CID
      csv += csvescape(m[9]) + ','; // comment
      csv += m[10] + ','; // registered
      csv += 'http://animita.tv' + m[1] + '\r\n'; // URL
    }
    return csv;
  }
  function syncGet(url) {
    //console.info('syncGet url=' + url);
    //$.ajax({
    //  type: 'GET',
    //  url: url,
    //}).done(function (result) {
    //  console.info(result);
    //  return result.text;
    //});
    return $.ajax({
      type: 'GET',
      url: url,
      async: false,
    }).responseText;
  }
  function unescape(str) { // 文字実体参照を文字に変更
    if (!str) return '';
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&#039;/g, '\'');
    str = str.replace(/&hellip;/g, '…');
    str = str.replace(/&prime;/g, '′');
    str = str.replace(/&Prime;/g, '″');
    str = str.replace(/&times;/g, '×');
    str = str.replace(/&lsquo;/g, '‘');
    str = str.replace(/&rsquo;/g, '’');
    str = str.replace(/&ldquo;/g, '“');
    str = str.replace(/&rdquo;/g, '”');
    str = str.replace(/&infin;/g, '∞');
    str = str.replace(/&larr;/g, '←');
    str = str.replace(/&uarr;/g, '↑');
    str = str.replace(/&rarr;/g, '→');
    str = str.replace(/&darr;/g, '↓');
    str = str.replace(/&hArr;/g, '⇔');
    str = str.replace(/&hearts;/g, '♥');
    str = str.replace(/&omega;/g, 'ω');
    str = str.replace(/&Phi;/g, 'Φ');
    str = str.replace(/&mu;/g, 'μ');
    str = str.replace(/&Delta;/g, 'Δ');
    str = str.replace(/&dagger;/g, '†');
    str = str.replace(/&radic;/g, '√');
    str = str.replace(/&Eacute;/g, 'É');
    str = str.replace(/&Egrave;/g, 'È');
    str = str.replace(/&sup2;/g, '²');
    str = str.replace(/&sup3;/g, '³');
    return str;
  }
  function csvescape(str) { // CSV
    if (!str) return '""';
    return '"' + unescape(str).replace(/"/g, '""') + '"';
  }
}) ();
