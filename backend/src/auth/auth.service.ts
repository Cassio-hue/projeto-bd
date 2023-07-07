import { Injectable } from '@nestjs/common';
import { StudentsService } from '../students/students.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentsService,
    private jwtService: JwtService,
  ) {}

  async login(student: any) {
    const payload = { sub: student.id, email: student.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let student: any;
    try {
      student = await this.studentService.findOne({ email: email });
    } catch (error) {
      return null;
    }

    if (student?.password !== password) return null;

    return student;
  }
}
