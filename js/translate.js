function translatePage() {
    var translationData = null;

    $.getJSON('https://remi1095.github.io/french.json', function (data) {
        translationData = data;
        if ($('html').attr('lang') === 'en') {
            $('html').attr('lang', 'fr')
            translateElement($('body'), translationData, 'fr');
            $('#page-language').text('English')
        } else if ($('html').attr('lang') === 'fr') {
            $('html').attr('lang', 'en')
            translateElement($('body'), translationData, 'en');
            $('#page-language').text('Français')
        }

    }).fail(function () {
        console.log('Failed to load translation file');
    });


    function translateElement(element, translationData, targetLanguage) {
        element.contents().each(function () {
            var node = $(this);
            if (node[0].nodeType === Node.TEXT_NODE) {
                if (targetLanguage === 'fr') {
                    var translatedText = translateToFrench(node.text(), translationData);
                    node.replaceWith(translatedText);
                } else if (targetLanguage === 'en') {
                    var translatedText = translateToEnglish(node.text(), translationData);
                    node.replaceWith(translatedText);
                }
            } else if (node[0].nodeType === Node.ELEMENT_NODE) {

                translateElement(node, translationData, targetLanguage);
            }
        });
    }


    function translateToFrench(text, translationData) {
        if (translationData && translationData[text]) {
            return translationData[text];
        }
        return text;
    }

    function translateToEnglish(text, translationData) {
        for (var key in translationData) {
            if (translationData.hasOwnProperty(key)) {
                if (translationData[key] === text) {
                    return key;
                }
            }
        }
        return text;
    }
}