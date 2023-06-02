function getLanguageCode(languageName) {
    const languageCodes = {
        english: 'en',
        spanish: 'es',
        french: 'fr',
        german: 'de',
       
    };

   
    const lowercaseLanguageName = languageName.toLowerCase();

   
    if (lowercaseLanguageName in languageCodes) {
        return languageCodes[lowercaseLanguageName];
    } else {
       
        return '';
    }
}

function getCountryCode(languageName) {
    const languageCodes = {
        english: 'gb',
        spanish: 'es',
        french: 'fr',
        german: 'de',
       
    };

   
    const lowercaseLanguageName = languageName.toLowerCase();

   
    if (lowercaseLanguageName in languageCodes) {
        return languageCodes[lowercaseLanguageName];
    } else {
       
        return '';
    }
}



$(document).ready(function () {

    $.getJSON('http://localhost:8080/data.json', function (data) {

        $.each(data.tutors, function (index, tutor) {

            var tutorElement = $('<div>', { class: 'rounded-box ms-5 me-5' });

            var rowElement = $('<div>', { class: 'row' });

            var leftColumn = $('<div>', { class: 'col-4 text-center' });

            var profilePicture = $('<img>', { src: tutor.picture, class: 'border border-dark profile-picture' });
            leftColumn.append(profilePicture);

            var rating = $('<h4>', { class: 'mt-3' }).html('<span class="star-icon"></span> ' + tutor.rating);
            leftColumn.append(rating);

            var hourlyRate = $('<h3>', { class: 'sky-text' }).text('C$' + tutor.hourlyRate);
            leftColumn.append(hourlyRate);

            var currencyPerHour = $('<h3>').text('CAD/H');
            leftColumn.append(currencyPerHour);

            var rightColumn = $('<div>', { class: 'col-8' });

            var headerDiv = $('<div>', { class: 'd-flex justify-content-between' });

            var name = $('<h2>', { class: 'navy-text d-inline' }).text(tutor.name);
            headerDiv.append(name);

            var languagePillDiv = $('<div>', { class: 'ms-auto' });

            var languagePill = $('<div>', { class: 'gray-pill d-inline' });
            languagePill.text(getLanguageCode(tutor.nativeLanguage).toUpperCase());

            var countryCode = getCountryCode(tutor.nativeLanguage);
            var flagImage = $('<img>', { src: `https://hatscripts.github.io/circle-flags/flags/${countryCode}.svg` });
            languagePill.append(flagImage);

            languagePillDiv.append(languagePill);
            headerDiv.append(languagePillDiv);
            rightColumn.append(headerDiv);

            var description = $('<p>').text(tutor.description);
            rightColumn.append(description);

            var location = $('<h4>').text(tutor.location);
            rightColumn.append(location);

            var lessonLocation = $('<h4>').text(tutor.lessonLocation.join(', '));
            rightColumn.append(lessonLocation);

            var levels = $('<h4>').text(tutor.levels.join(', '));
            rightColumn.append(levels);

            var ageGroups = $('<h4>').text(tutor.ageGroups.join(', '));
            rightColumn.append(ageGroups);

            rowElement.append(leftColumn);
            rowElement.append(rightColumn);

            var buttonElement = $('<button>', { class: 'button-pill', text: 'Book Lessons' });
            rowElement.append(buttonElement);

            tutorElement.append(rowElement);

            $('#tutorCards').append(tutorElement);
            $('#tutorCards').append($('<br>'));
        });
    });
});