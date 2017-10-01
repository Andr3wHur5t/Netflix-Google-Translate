// Translate Neflix Captions Using the Google Translate API.

(function initTranslator(apiKey, lang) {
  var translateURL = 'https://translation.googleapis.com/language/translate/v2?key=' + apiKey;
  function makeSafe(s) { return s.replace(/[^a-z0-9]/gi, '') }
  function getSubtitleObj() { return document.getElementsByClassName('player-timedtext-text-container')[0] }
  function setSubtitleText(elem, text) {
      for (var i = 0; i < elem.children.length; i += 1) { elem.children[i].innerText = ''; }
      elem.children[0].innerText = text;
  }

  // Cache lets us handle common statements without lookup costs.
  var translationCache = {}
  function translateCaption(text, done) {
    if (translationCache[text]) return done(null, translationCache[text]);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', translateURL);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        var translated = JSON.parse(xmlhttp.response).data.translations[0].translatedText
        translated = translated.replace(/<br>/g, '\n')
        translationCache[text] = translated
        done(null, translationCache[text])
      }
    }
    xmlhttp.send(JSON.stringify({ q: text.replace(/[\r\n]/g, '<br>'), target: lang }));
  }

  var lastSet = "";
  var processing = false;
  function checkCaptions() {
    var subtitles = getSubtitleObj();
    if (!subtitles || processing || makeSafe(lastSet) === makeSafe(subtitles.innerText)) return;
    if (subtitles.innerText == '') return;

    var text = subtitles.innerText;
    // Hide Original While Sending
    setSubtitleText(subtitles, '');

    // Mutex to prevent multiple requests
    processing = true;
    translateCaption(text, function (err, toSet) {
      processing = false;
      lastSet = toSet;
      setSubtitleText(subtitles, toSet);
    });
  }
  var procNum = setInterval(checkCaptions, 10)
  console.log('System Online; Translating to "' + lang + '"')
  console.log('You can kill the translator using \'clearInterval(' + procNum + ')\'')
})('<API_KEY>', '<2_LETTER_LANG_CODE>')


