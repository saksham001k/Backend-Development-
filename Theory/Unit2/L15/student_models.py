"""Lecture 15: student models, relationships and a small CRUD demonstration."""

from sqlalchemy import CheckConstraint, Column, ForeignKey, Integer, String, create_engine
from sqlalchemy.orm import declarative_base, relationship, sessionmaker


Base = declarative_base()


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False, unique=True)
    students = relationship("Student", back_populates="department")
    courses = relationship("Course", back_populates="department")


class Student(Base):
    __tablename__ = "students"
    __table_args__ = (CheckConstraint("branch IN ('CSE', 'ECE', 'IT', 'ME', 'CE')"),)

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    branch = Column(String(10), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    department = relationship("Department", back_populates="students")
    enrollments = relationship(
        "Enrollment", back_populates="student", cascade="all, delete-orphan"
    )


class Course(Base):
    __tablename__ = "courses"
    __table_args__ = (CheckConstraint("credits BETWEEN 1 AND 6"),)

    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False, unique=True)
    credits = Column(Integer, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    department = relationship("Department", back_populates="courses")
    enrollments = relationship("Enrollment", back_populates="course")


class Enrollment(Base):
    __tablename__ = "enrollments"

    student_id = Column(Integer, ForeignKey("students.id"), primary_key=True)
    course_id = Column(Integer, ForeignKey("courses.id"), primary_key=True)
    semester = Column(String(20), nullable=False)
    student = relationship("Student", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")


engine = create_engine("sqlite:///students.db")
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)


def main():
    with Session() as session:
        department = session.query(Department).filter_by(name="Computer Science").first()
        if department is None:
            department = Department(name="Computer Science")
            session.add(department)

        course = session.query(Course).filter_by(title="Backend Development").first()
        if course is None:
            course = Course(title="Backend Development", credits=4, department=department)
            session.add(course)

        # Create a student, assign a department and enroll in a course.
        student = Student(
            name="Aarav", email="aarav@example.com", branch="CSE", department=department
        )
        student.enrollments.append(Enrollment(course=course, semester="Semester 5"))
        session.add(student)
        session.commit()
        student_id = student.id
        print("Created:", student.name, "in", student.department.name)

        # Read all students in a branch.
        students = session.query(Student).filter_by(branch="CSE").all()
        print("CSE students:", [item.name for item in students])

        # Update and commit the change.
        student.branch = "ECE"
        session.commit()
        print("Updated branch:", student.branch)

        # The related enrollment is deleted by the ORM cascade.
        session.delete(student)
        session.commit()
        remaining = session.query(Enrollment).filter_by(student_id=student_id).count()
        print("Enrollments after deleting student:", remaining)


if __name__ == "__main__":
    main()
