# Barnomz API Documentation

## Endpoints

### Get All Schedules
- **URL:** `/schedules`
- **Method:** `GET`
- **Request Body:** None
- **Response Body:**
  ```json
  {
    "status": "success",
    "message": "Schedules retrieved successfully.",
    "data": [
      {
        "id": 1,
        "name": "Fall Semester",
        "courses": [
          {
            "id": 1,
            "code": "40384",
            "title": "Web Programming",
            "lecturer": "Mr. Smith",
            "credit": 3,
            "start": "13:30",
            "end": "15:00",
            "capacity": 40,
            "remainingCapacity": 10,
            "barnomzEnrollments": 20,
            "examDate": "2023-12-18T17:00",
            "group": 2
          }
          // More courses...
        ]
      }
      // More schedules...
    ]
  }
  

### Add New Schedule
- **URL:** `/schedules`
- **Method:** `POST`
- **Request Body:** None
- **Response Body:** Same as "Get All Schedules"

### Remove Specific Schedule
- **URL:** `/schedules`
- **Method:** `DELETE`
- **Request Body:**
  ```json
  {
    "id": "1"
  }
  ```
- **Response Body:** Same as "Get All Schedules"

### Add New Course to a Specific Schedule
- **URL:** `/schedules/{scheduleId}/course`
- **Method:** `POST`
- **Request Body:** Course object
- **Response Body:** Same as "Get All Schedules"

### Remove Course from a Specific Schedule
- **URL:** `/schedules/{scheduleId}/course`
- **Method:** `DELETE`
- **Request Body:**
  ```json
  {
    "id": "1"
  }
  ```
- **Response Body:** Same as "Get All Schedules"

### Make a Schedule Public
- **URL:** `/schedules/{scheduleId}/makePublic`
- **Method:** `PATCH`
- **Request Body:**
  ```json
  {
    "id": "1"
  }
  ```
- **Response Body:** None

### Duplicate a Specific Schedule
- **URL:** `/schedules/{scheduleId}/duplicate`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "id": "1"
  }
  ```
- **Response Body:** Same as "Get All Schedules"

### Get All Colleges
- **URL:** `/colleges`
- **Method:** `GET`
- **Request Body:** None
- **Response Body:**
  ```json
  {
    "status": "success",
    "message": "Colleges retrieved successfully.",
    "data": [
      {
        "id": 1,
        "name": "Computer Science College"
      }
      // More colleges...
    ]
  }
  ```

### Get All Courses of a College
- **URL:** `/colleges/{collegeId}/courses`
- **Method:** `GET`
- **Request Body:**
  ```json
  {
    "id": 1
  }
  ```
- **Response Body:** List of all courses of the specified college

### Get List of All Public Schedules Based on Filters
- **URL:** `/schedules/public`
- **Method:** `POST`
- **Request Body:** Filters (array of objects)
- **Response Body:** List of filtered schedules

### Get Info About a Specific Lecturer
- **URL:** `/lecturers/{lecturerId}`
- **Method:** `GET`
- **Request Body:** None
- **Response Body:**
  ```json
  {
    "status": "success",
    "message": "Lecturer info retrieved successfully.",
    "data": {
      "id": 1,
      "name": "Dr. John Doe",
      "college": "Computer Science",
      "numberOfVotes": 100,
      "rate": {
        "teachQuality": 4.5,
        "scoring": 4.0,
        "morality": 4.7
      }
    }
  }
  ```

### Get All Reviews About a Lecturer
- **URL:** `/lecturers/{lecturerId}/reviews`
- **Method:** `GET`
- **Request Body:**
  ```json
  {
    "id": 1
  }
  ```
- **Response Body

:**
  ```json
  {
    "status": "success",
    "message": "Reviews retrieved successfully.",
    "data": [
      {
        "id": 1,
        "date": "2023-01-01",
        "text": "Great teaching style.",
        "likes": 20,
        "dislikes": 5
      }
      // More reviews...
    ]
  }
  ```

### Add Review for a Specific Lecturer
- **URL:** `/lecturers/{lecturerId}/reviews`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "id": 1,
    "text": "The lecture was very insightful."
  }
  ```
- **Response Body:**
  ```json
  {
    "status": "success",
    "message": "Review added successfully.",
    "data": {
      "lecturerId": "lecturer1",
      "reviewId": "review123",
      "text": "The lecture was very insightful.",
      "date": "2023-01-15",
      "likes": 0,
      "dislikes": 0
    }
  }
  ```


This endpoint allows users to add a review for a lecturer by specifying the lecturer's ID and the text of the review. The response includes the details of the newly added review.
