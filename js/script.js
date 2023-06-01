function generateCalendar(availability) {

    var table = document.getElementById("calendar");
    var startHour = 8;
    var endHour = 22;

    for (var i = startHour; i <= endHour; i++) {
        var row = table.insertRow(i - startHour + 1);
        var timeCell = row.insertCell(0);
        var time = i + ":00";
        if (i < 10) {
            time = "0" + time;
        }
        timeCell.innerHTML = time;

        for (var j = 1; j <= 7; j++) {
            var dayCell = row.insertCell(j);
            var day = getDayName(j);

            if (availability.hasOwnProperty(day)) {
                var timeslots = availability[day];
                var isAvailable = false;

                for (var k = 0; k < timeslots.length; k++) {
                    var timeslot = timeslots[k];
                    var [start, end] = timeslot.split(" - ");
                    var startTime = parseInt(start.split(":")[0]);
                    var endTime = parseInt(end.split(":")[0]);

                    if (i >= startTime && i < endTime) {
                        isAvailable = true;
                        break;
                    }
                }

                if (isAvailable) {
                    dayCell.classList.add("available");
                }
            }
        }
    }
}

function getDayName(dayIndex) {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayIndex];
}

$(document).ready(function () {
    // Check if the current page is tutorInfo.html
    if (window.location.pathname.includes('tutorInfo.html')) {
        var tutorName = 'John Smith'; // Replace 'John Smith' with the desired tutor's name

        $.getJSON('http://localhost:8080/data.json', function (data) {
            var tutors = data.tutors;

            var tutor = tutors.find(function (tutor) {
                return tutor.name === tutorName;
            });

            if (tutor) {
                $('#tutor-name').empty().text(tutor.name); // Set the tutor's name in the <h3> element
                $('#tutor-description').empty().text(tutor.description); // Set the tutor's description in the <p> element

                // Remove the existing rows in the calendar table except the header row
                $('#calendar tr:gt(0)').remove();

                generateCalendar(tutor.availability); // Generate the calendar table

                var tutorTableBody = $('#tutor-table tbody'); // Get the tutor table body
                tutorTableBody.empty(); // Clear the table body

                for (var key in tutor) {
                    if (
                        tutor.hasOwnProperty(key) &&
                        key !== 'name' &&
                        key !== 'picture' &&
                        key !== 'description' &&
                        key !== 'availability'
                    ) {
                        var fieldName = key.replace(/([A-Z])/g, ' $1').trim(); // Convert camelCase to capitalized words
                        fieldName = fieldName.replace(/^./, function (str) {
                            return str.toUpperCase();
                        }); // Capitalize the first letter
                        var row = $('<tr>');

                        row.append($('<td>').text(fieldName));
                        row.append($('<td>').text(tutor[key]));

                        tutorTableBody.append(row); // Append the row to the tutor table body
                    }
                }
            }
        });
    }
});
