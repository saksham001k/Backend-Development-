"""Lecture 16: small FastAPI + SQLAlchemy CRUD example using SQLite."""

from datetime import date
from pathlib import Path
from typing import Optional

from fastapi import Depends, FastAPI, HTTPException, Query, Response, status
from pydantic import BaseModel, Field
from sqlalchemy import Column, Date, ForeignKey, Integer, String, create_engine
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, declarative_base, relationship, sessionmaker


DATABASE = Path(__file__).with_name("courses.db")
engine = create_engine(f"sqlite:///{DATABASE}", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


class Department(Base):
    __tablename__ = "departments"
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)
    students = relationship("Student", back_populates="department")


class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    credits = Column(Integer, nullable=False)
    department = Column(String(50), nullable=False)


class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    branch = Column(String(50), nullable=False)
    enrollment_date = Column(Date, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    department = relationship("Department", back_populates="students")
    enrollments = relationship("Enrollment", back_populates="student", cascade="all, delete-orphan")


class Enrollment(Base):
    __tablename__ = "enrollments"
    student_id = Column(Integer, ForeignKey("students.id"), primary_key=True)
    course_id = Column(Integer, ForeignKey("courses.id"), primary_key=True)
    student = relationship("Student", back_populates="enrollments")
    course = relationship("Course")


Base.metadata.create_all(engine)
with SessionLocal() as db:
    for name in ("CSE", "ECE"):
        if db.query(Department).filter_by(name=name).first() is None:
            db.add(Department(name=name))
    db.commit()

app = FastAPI(title="Lecture 16 Course and Student API")


def get_db():
    with SessionLocal() as db:
        yield db


class CourseInput(BaseModel):
    title: str = Field(min_length=1)
    credits: int = Field(ge=1, le=6)
    department: str = Field(min_length=1)


class CourseOutput(CourseInput):
    id: int
    model_config = {"from_attributes": True}


class StudentInput(BaseModel):
    name: str = Field(min_length=1)
    email: str = Field(min_length=3)
    branch: str = Field(min_length=1)
    enrollment_date: date
    department_id: int
    course_ids: list[int] = Field(default_factory=list)


def course_or_404(db: Session, course_id: int):
    course = db.get(Course, course_id)
    if course is None:
        raise HTTPException(404, "Course not found")
    return course


def student_or_404(db: Session, student_id: int):
    student = db.get(Student, student_id)
    if student is None:
        raise HTTPException(404, "Student not found")
    return student


def student_result(student: Student):
    return {
        "id": student.id,
        "name": student.name,
        "email": student.email,
        "branch": student.branch,
        "enrollment_date": student.enrollment_date,
        "department_id": student.department_id,
        "department": student.department.name,
        "course_ids": [item.course_id for item in student.enrollments],
    }


def apply_student_data(db: Session, student: Student, data: StudentInput):
    department = db.get(Department, data.department_id)
    if department is None:
        raise HTTPException(404, "Department not found")
    course_ids = list(dict.fromkeys(data.course_ids))
    if any(db.get(Course, course_id) is None for course_id in course_ids):
        raise HTTPException(404, "Course not found")
    student.name = data.name
    student.email = data.email
    student.branch = data.branch
    student.enrollment_date = data.enrollment_date
    student.department = department
    student.enrollments = [Enrollment(course_id=course_id) for course_id in course_ids]


def commit_or_conflict(db: Session):
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(409, "Email already exists")


@app.get("/departments")
def list_departments(db: Session = Depends(get_db)):
    return [{"id": item.id, "name": item.name} for item in db.query(Department).order_by(Department.id)]


@app.get("/courses", response_model=list[CourseOutput])
def list_courses(department: Optional[str] = None, credits: Optional[int] = None,
                 page: int = Query(1, ge=1), db: Session = Depends(get_db)):
    query = db.query(Course)
    if department:
        query = query.filter(Course.department == department)
    if credits is not None:
        query = query.filter(Course.credits == credits)
    return query.order_by(Course.id).offset((page - 1) * 10).limit(10).all()


@app.get("/courses/{course_id}", response_model=CourseOutput)
def get_course(course_id: int, db: Session = Depends(get_db)):
    return course_or_404(db, course_id)


@app.post("/courses", response_model=CourseOutput, status_code=status.HTTP_201_CREATED)
def create_course(data: CourseInput, db: Session = Depends(get_db)):
    course = Course(**data.model_dump())
    db.add(course)
    db.commit()
    db.refresh(course)
    return course


@app.put("/courses/{course_id}", response_model=CourseOutput)
def update_course(course_id: int, data: CourseInput, db: Session = Depends(get_db)):
    course = course_or_404(db, course_id)
    for key, value in data.model_dump().items():
        setattr(course, key, value)
    db.commit()
    db.refresh(course)
    return course


@app.delete("/courses/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(course_id: int, db: Session = Depends(get_db)):
    course = course_or_404(db, course_id)
    if db.query(Enrollment).filter_by(course_id=course_id).first():
        raise HTTPException(409, "Course has enrolled students")
    db.delete(course)
    db.commit()
    return Response(status_code=204)


@app.get("/students")
def list_students(db: Session = Depends(get_db)):
    return [student_result(item) for item in db.query(Student).order_by(Student.id)]


@app.get("/students/{student_id}")
def get_student(student_id: int, db: Session = Depends(get_db)):
    return student_result(student_or_404(db, student_id))


@app.post("/students", status_code=status.HTTP_201_CREATED)
def create_student(data: StudentInput, db: Session = Depends(get_db)):
    student = Student()
    apply_student_data(db, student, data)
    db.add(student)
    commit_or_conflict(db)
    db.refresh(student)
    return student_result(student)


@app.put("/students/{student_id}")
def update_student(student_id: int, data: StudentInput, db: Session = Depends(get_db)):
    student = student_or_404(db, student_id)
    apply_student_data(db, student, data)
    commit_or_conflict(db)
    db.refresh(student)
    return student_result(student)


@app.delete("/students/{student_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = student_or_404(db, student_id)
    db.delete(student)
    db.commit()
    return Response(status_code=204)
