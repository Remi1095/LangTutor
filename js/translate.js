function translateText(text, targetLanguage) {
    var translationData = null;

    // Fetch the translation file using jQuery's $.getJSON() method
    $.getJSON('https://remi1095.github.io/translations.json', function(data) {
        translationData = data;
    })
    .fail(function() {
        console.log('Failed to load translation file');
    });

    // Check if the translation exists for the target language
    if (translationData && translationData[text] && translationData[text][targetLanguage]) {
        return translationData[text][targetLanguage];
    }

    // If translation doesn't exist, return the original text
    return text;
}

function translatePageToFrench() {
    // Retrieve all text elements on the page
    var textElements = document.querySelectorAll('body *:not(script):not(style):not(noscript):not(textarea):not(input)');

    // Iterate through each text element and translate its content to French
    textElements.forEach(function (element) {
        var originalText = element.textContent.trim();

        // Translate the text using the translateText function
        var translatedText = translateText(originalText, 'fr');
        element.textContent = translatedText;
    });
}

function translatePageToEnglish() {
    // Retrieve all text elements on the page
    var textElements = document.querySelectorAll('body *:not(script):not(style):not(noscript):not(textarea):not(input)');

    // Iterate through each text element and translate its content to English
    textElements.forEach(function (element) {
        var originalText = element.getAttribute('data-original-text');
        if (originalText) {
            element.textContent = originalText;
            element.removeAttribute('data-original-text');
        }
    });
}

window.addEventListener('load', translatePageToFrench);