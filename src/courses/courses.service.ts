import { HttpException, Injectable } from '@nestjs/common';
import { COURSES } from './courses.mock';
import { Course } from './course.interface';

@Injectable()
export class CoursesService {
  private readonly courses: Course[] = COURSES;

  getCourses(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.courses);
    });
  }

  getCourse(courseId): Promise<any> {
    const id = Number(courseId);
    return new Promise((resolve) => {
      const course = this.courses.find((course) => course.id === id);
      if (!course) {
        throw new HttpException('Course does not exist', 404);
      }
      resolve(course);
    });
  }

  addCourse(course: Course): Promise<any> {
    return new Promise((resolve) => {
      this.courses.push(course);
      resolve(this.courses);
    });
  }

  deleteCourse(courseId): Promise<any> {
    const id = Number(courseId);
    return new Promise((resolve) => {
      const index = this.courses.findIndex((course) => course.id === id);
      if (index === -1) {
        throw new HttpException('course does not exist', 404);
      }
      this.courses.splice(index, 1);
      resolve(this.courses);
    });
  }
}
