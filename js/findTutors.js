function getLanguageCode(languageName) {
    const languageCodes = {
        english: 'en',
        spanish: 'es',
        french: 'fr',
        german: 'de',
        chinese: 'zh',
        arabic: 'ar',
        russian: 'ru',
        portuguese: 'pt',
        japanese: 'ja',
        italian: 'it',
    };


    const lowercaseLanguageName = languageName.toLowerCase();


    if (lowercaseLanguageName in languageCodes) {
        return languageCodes[lowercaseLanguageName];
    } else {

        return '';
    }
}

function getCountryCode(languageName) {
    const countryCodes = {
        english: 'gb',
        spanish: 'es',
        french: 'fr',
        german: 'de',
        chinese: 'cn',
        arabic: 'sa',
        russian: 'ru',
        portuguese: 'pt',
        japanese: 'jp',
        italian: 'it',
    };


    const lowercaseLanguageName = languageName.toLowerCase();


    if (lowercaseLanguageName in countryCodes) {
        return countryCodes[lowercaseLanguageName];
    } else {

        return '';
    }
}

function toTutorInfo(tutorName) {
    var url = 'https://remi1095.github.io/tutorInfo.html?name=' + encodeURIComponent(tutorName);
    window.location.href = url;
}

function generateTutorCards(filters) {
    $('#tutorCards').empty();

    $.getJSON('https://remi1095.github.io/data.json', function (data) {


        var numTutors = 0;
        $.each(data.tutors, function (index, tutor) {
            // filter
            if (
                (filters.language && !tutor.languages.some(lang => lang.toLowerCase() === filters.language.toLowerCase())) ||
                (filters.level && !tutor.levels.some(level => level.toLowerCase() === filters.level.toLowerCase())) ||
                (filters.age && !tutor.ageGroups.some(age => age.toLowerCase() === filters.age.toLowerCase()))
            ) {
                return true; // continue
            }

            var tutorElement = $('<div>', { class: 'rounded-box ms-5 me-5' });

            var rowElement = $('<div>', { class: 'row' });

            var leftColumn = $('<div>', { class: 'col-4 text-center' });

            var profilePicture = $('<img>', { src: tutor.picture, class: 'border border-dark profile-picture' });
            leftColumn.append(profilePicture);

            var averageRating = tutor.reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
            var rating = $('<h4>', { class: 'mt-3' }).html('<span class="star-icon"></span> ' + averageRating.toFixed(1));
            leftColumn.append(rating);

            var hourlyRate = $('<h3>', { class: 'sky-text' }).text('C$' + tutor.hourlyRate.toFixed(2));
            leftColumn.append(hourlyRate);

            var currencyPerHour = $('<h3>').text('CAD/H');
            leftColumn.append(currencyPerHour);

            var rightColumn = $('<div>', { class: 'col-8' });

            var headerDiv = $('<div>', { class: 'd-flex justify-content-between' });

            var name = $('<h4>', { class: 'navy-text d-inline fw-bold' }).text(tutor.name);
            headerDiv.append(name);

            var languagePillDiv = $('<div>', { class: 'ms-auto' });

            $.each(tutor.languages, function (index, lang) {
                var languagePill = $('<div>', { class: 'gray-pill d-inline ms-2' });
                languagePill.text(getLanguageCode(lang).toUpperCase());

                var countryCode = getCountryCode(lang);
                var flagImage = $('<img>', { src: `https://hatscripts.github.io/circle-flags/flags/${countryCode}.svg` });
                languagePill.append(flagImage);

                languagePillDiv.append(languagePill);
            });

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

            var buttonElement = $('<button>', { class: 'button-pill', onclick: `toTutorInfo('${tutor.name}')`, text: 'Book Lessons' });
            rowElement.append(buttonElement);

            tutorElement.append(rowElement);

            $('#tutorCards').append(tutorElement);
            $('#tutorCards').append($('<br>'));
            numTutors++;
        });

        if (filters.language) {
            $('#num-tutors').text(`${numTutors} ${filters.language} tutors available`);
        } else {
            $('#num-tutors').text(`${numTutors} tutors available`);
        }
    });
}


$(document).ready(function () {


    var params = new URLSearchParams(window.location.search);

    var bookingTutorName = params.get('tutor-name');
    if (bookingTutorName !== null) {
        $('#success-title').text(`Successfully sent email to ${bookingTutorName}`)
        $('#success-body').text(`You will receive an email at ${params.get('email')} to confirm your booking and payement`)
        $('#success-popup').modal('show');
    }

    var filters = {
        language: null,
        level: null,
        age: null
    };

    var initialLanguage = params.get('language');
    if (initialLanguage !== null) {
        filters.language = initialLanguage;
        $('#language-button').text(initialLanguage);
    }

    generateTutorCards(filters);

    ['language', 'level', 'age'].forEach(function (filter) {
        $(`#${filter} .dropdown-item`).click(function () {
            var value = $(this).text();
            $(`#${filter}-button`).text(value);
            if (value === 'All') {
                filters[filter] = null;
            } else {
                filters[filter] = value;
            }
            generateTutorCards(filters);
        });
    });

});