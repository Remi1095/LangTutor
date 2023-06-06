function translatePageToFrench() {
    var translationData = null;

    // Fetch the translation file using jQuery's $.getJSON() method
    $.getJSON('https://remi1095.github.io/french.json', function (data) {
        translationData = data;

        // Translate the page content
        translateElement($('body'), translationData, 'fr');
    })
        .fail(function () {
            console.log('Failed to load translation file');
        });

    // Recursive function to translate an element and its children
    function translateElement(element, translationData) {
        element.contents().each(function () {
            var node = $(this);
            if (node[0].nodeType === Node.TEXT_NODE) {
                // Translate text node
                var translatedText = translateText(node.text(), translationData);
                node.replaceWith(translatedText);
            } else if (node[0].nodeType === Node.ELEMENT_NODE) {
                // Translate element recursively
                translateElement(node, translationData);
            }
        });
    }

    // Translation function
    function translateText(text, translationData) {
        if (translationData && translationData[text]) {
            return translationData[text];
        }
        return text;
    }
}

// Call the translatePageToFrench function when the document is ready
$(document).ready(function () {
    translatePageToFrench();
});