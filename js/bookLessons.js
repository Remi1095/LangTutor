function validateForm() {
    
    var checkboxes = document.getElementsByName('time[]');
    var checked = false;
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checked = true;
            break;
        }
    }
    if (!checked) {
        alert('Please select at least one time.');
        return false;
    }

    checkboxes = document.getElementsByName('location[]');
    checked = false;
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checked = true;
            break;
        }
    }
    if (!checked) {
        alert('Please select at least one lesson location.');
        return false;
    }

    return true;

}

function validateEmail(email) {
    // Regular expression to validate email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    // Regular expression to validate phone number format (accepts various common formats)
    var phoneRegex = /^\+?[\d-]+$/;
    return phoneRegex.test(phone);
}




$(document).ready(function () {
    var params = new URLSearchParams(window.location.search);
    var tutorName = params.get('name');
    $("#tutor-name").attr('value', tutorName);

    $.getJSON('http://localhost:8080/data.json', function (data) {
        var tutors = data.tutors;

        var tutor = tutors.find(function (tutor) {
            return tutor.name === tutorName;
        });

        if (tutor) {
            $('#form-title').text(`Book Lessons With ${tutor.name}`)

            $('#send-button').attr('value', `Send to ${tutor.name}`)


            var locationSelect = $('#location');
            $.each(tutor.lessonLocation, function (index, value) {
                var input = $('<input>', { class: "form-check-input", type: "checkbox", name: "location[]", value: value });
                locationSelect.append(input);
                var label = $('<label>', { class: "form-check-label fw-normal", text: value });
                locationSelect.append(label);
            });

            var timeSelect = $('#time');
            $.each(tutor.availability, function (index, value) {

                //<div class="form-check form-check-inline">
                var form = $('<div>', { class: "form-check form-check-inline align-top" })
                var header = $('<p>', {class: "mb-0", text: index});
                form.append(header);

                //var profilePicture = $('<img>', { src: tutor.picture, class: 'border border-dark profile-picture' });
                value.forEach(function (time) {
                    var input = $('<input>', { class: "form-check-input", type: "checkbox", name: "time[]", value: `${index} ${time}` });
                    form.append(input);
                    var label = $('<label>', { class: "form-check-label fw-normal", text: time });
                    form.append(label);
                });

                timeSelect.append(form);
            });
        }
    });
});



