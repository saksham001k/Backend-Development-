from typing import List, Optional

from fastapi import FastAPI, HTTPException, Query, Response, status
from pydantic import BaseModel

app = FastAPI(title="Course Management API", version="1.0.0")


class Course(BaseModel):
    id: int
    title: str
    credits: int
    department: str


class CourseInput(BaseModel):
    title: str
    credits: int
    department: str


courses: List[Course] = [
    Course(id=1, title="Backend Development", credits=4, department="CSE"),
    Course(id=2, title="Computer Networks", credits=4, department="CSE"),
    Course(id=3, title="Digital Electronics", credits=3, department="ECE"),
]


@app.get("/")
def home():
    return {"message": "Course Management API is running"}


@app.get("/courses", response_model=List[Course])
def list_courses(department: Optional[str] = Query(default=None)):
    if department:
        return [course for course in courses if course.department.lower() == department.lower()]
    return courses


@app.get("/courses/{course_id}", response_model=Course)
def get_course(course_id: int):
    course = next((item for item in courses if item.id == course_id), None)
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@app.post("/courses", response_model=Course, status_code=status.HTTP_201_CREATED)
def create_course(data: CourseInput):
    new_id = max((course.id for course in courses), default=0) + 1
    course = Course(id=new_id, **data.model_dump())
    courses.append(course)
    return course


@app.put("/courses/{course_id}", response_model=Course)
def update_course(course_id: int, data: CourseInput):
    for index, course in enumerate(courses):
        if course.id == course_id:
            updated = Course(id=course_id, **data.model_dump())
            courses[index] = updated
            return updated
    raise HTTPException(status_code=404, detail="Course not found")


@app.delete("/courses/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(course_id: int):
    for index, course in enumerate(courses):
        if course.id == course_id:
            courses.pop(index)
            return Response(status_code=status.HTTP_204_NO_CONTENT)
    raise HTTPException(status_code=404, detail="Course not found")
