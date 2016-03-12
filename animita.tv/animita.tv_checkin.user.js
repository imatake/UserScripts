// ==UserScript==
// @name        あにみた！チェックイン
// @description エピソード一覧(作品ページ)で各エピソードのチェックインボタンを作成します。視聴環境は一括チェックインの選択を使用します。コメント投稿は出来ません。
// @namespace   imatake.github.io
// @include     http://animita.tv/product/*
// @author      imatake
// @version     1.00.20150728
// @license     MIT License
// @icon        data:image/gif;base64,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
// @grant       none
// ==/UserScript==
(function () {
  var re = /http\:\/\/animita\.tv\/episode\/(\d+)\/(\d+)/;
  //var product_name = $('meta#[property="og:title"]').attr('content');
  var product_name = $('div.top_logo div p') [0].textContent.trim();
  //////
  // チェックインボタンの貼り付け
  $('#episode_list li[data-icon="arrow-r"]').each(function () {
    var episode_text = this.children[0];
    var episode_icon = this.children[1];
    if (!episode_text.children[0]) {
      var m = re.exec(episode_text.href);
      if (m) {
        //var product_id = m[1];
        var episode_id = m[2];
        var episode_name = episode_text.textContent.trim();
        //console.info(episode_text.href + ' pid=' + product_id + ' eid=' + episode_id);
        //console.info(product_name + ' ' + episode_name);
        //
        var episode_checkin_icon = document.createElement('img');
        episode_checkin_icon.src = '/assets/img/common/mypage_icon_checkin.png';
        episode_checkin_icon.className = 'mypageIcon';
        var episode_checkin = document.createElement('div');
        episode_checkin.id = 'episode_checkin_' + product_id + '_' + episode_id;
        episode_checkin.className = 'ui-li-count ui-btn-up-c ui-btn-corner-all';
        episode_checkin.style = 'right: 90px;';
        episode_checkin.setAttribute('animita-product-id', product_id);
        episode_checkin.setAttribute('animita-product-name', product_name);
        episode_checkin.setAttribute('animita-episode-id', episode_id);
        episode_checkin.setAttribute('animita-episode-name', episode_name);
        episode_checkin.appendChild(episode_checkin_icon);
        episode_checkin.addEventListener('click', animita_episode_checkin, false);
        this.insertBefore(episode_checkin, episode_icon);
      }
    }
  });
  //////
  // チェックイン処理
  function animita_episode_checkin(e) {
    var elem = e.currentTarget;
    e.returnValue = false;
    //console.info(user_id + ' ' + user_name);
    var product_id = elem.getAttribute('animita-product-id');
    var product_nm = elem.getAttribute('animita-product-name');
    var episode_id = elem.getAttribute('animita-episode-id');
    var episode_nm = elem.getAttribute('animita-episode-name');
    var watch_status = $('#social_form #watch_status').val();
    //console.info(product_id + '_' + episode_id + ':' + watch_status);
    //console.info(product_nm + ' ' + episode_nm);
    // POSTパラメータ作成
    var params = {
      user_id: user_id,
      user_agent: user_agent_full,
      product_id: product_id,
      episode_id: episode_id,
      comment: '',
      checkin_type: 'checkin',
      spoiler_warning: '',
      watch_status: watch_status,
    };
    //console.info(params);
    // チェックインのPOST
    $.ajax({
      type: 'POST',
      url: api_url + 'checkin/checkin.json',
      dataType: 'json',
      data: params,
      cache: false,
      success: function (msg) {
        alert('チェックイン完了\n' + product_nm + '\n' + episode_nm);
      },
    });
    // 後処理
    elem.parentElement.removeChild(elem); // 本当は成功したら消すが正しいけど大着
  }
}) ();
