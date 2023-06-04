from faker import Faker
import argparse
import random
import json

fake = Faker()

def random_data(num_tutors):
    tutors = []

    for _ in range(num_tutors):  
        tutor = {
            "name": fake.name(),
            "picture": "images/sample_profile.png",
            "location": fake.city() + ", " + fake.country(),
            "languages": random_languages(),
            "nativeLanguage": "",
            "ageGroups": random_age_groups(),
            "levels": random_levels(),
            "lessonLocation": random_lesson_location(),
            "timezone": random.choice(["EST", "GMT", "CET", "PST", "AEST"]),
            "rating": round(random.uniform(1.0, 5.0), 1),
            "hourlyRate": round(random.uniform(20.0, 50.0), 2),
            "description":  fake.paragraph(9),
            "availability": random_availability()
        }
        tutor['nativeLanguage'] = random.choice(tutor['languages'])
        tutors.append(tutor)

    data = {
        "tutors": tutors
    }

    return json.dumps(data, indent=2)

def random_name():
    first_names = ["John", "Sarah", "Michael", "Emma", "David", "Sophia"]
    last_names = ["Smith", "Johnson", "Brown", "Lee", "Wilson", "Taylor"]
    return random.choice(first_names) + " " + random.choice(last_names)

def random_location():
    cities = ["New York, USA", "London, UK", "Paris, France", "Tokyo, Japan", "Sydney, Australia"]
    return random.choice(cities)

def random_languages():
    languages = ["English", "Chinese", "Spanish", "Arabic", "French", "Russian", "Portuguese", "German", "Japanese", "Italian"]
    num_languages = random.randint(1, 3)
    return random.sample(languages, num_languages)

def random_age_groups():
    age_groups = ["Children", "Teenagers", "Adults", "Seniors"]
    num_age_groups = random.randint(1, 4)
    return random.sample(age_groups, num_age_groups)

def random_levels():
    levels = ["Beginner", "Intermediate", "Advanced"]
    num_levels = random.randint(1, 3)
    return random.sample(levels, num_levels)

def random_lesson_location():
    locations = ["Online", "Local"]
    num_locations = random.randint(1, 2)
    return random.sample(locations, num_locations)


def random_availability():
    weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    availability = {}
    for weekday in weekdays:
        availability[weekday] = []

    num_slots = random.randint(1, 7)

    for _ in range(num_slots):
        duration = random.randint(1, 3)
        start_time = random.randint(8, 23-duration)
        day = random.choice(weekdays)

        availability[day].append(f"{start_time}:00 - {start_time+duration}:00")

    return availability


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate random tutor data")
    parser.add_argument("num_tutors", type=int, help="number of tutors to generate")
    args = parser.parse_args()

    # Generate and print random data
    random_data = random_data(args.num_tutors)


    file_path = "data.json"

    with open(file_path, "w") as file:  # Use "w" mode to overwrite the file
        file.write(random_data)

    print("Data written to data.json.")
