import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createStudentDto: CreateStudentDto) {
    return this.prisma.student.create({
      data: {
        firstName: createStudentDto.firstName,
        lastName: createStudentDto.lastName,
        middleName: createStudentDto.middleName,
        classNumber: createStudentDto.classNumber,
        classLetter: createStudentDto.classLetter,
        birthDate: createStudentDto.birthDate
          ? new Date(createStudentDto.birthDate)
          : new Date('1992-02-28'),
        gender: createStudentDto.gender,
      },
      include: {
        results: true,
      },
    });
  }

  async findAll() {
    const students = await this.prisma.student.findMany();

    return students.map((student) => ({
      ...student,
      gender: student.gender === 'male' ? 'муж' : 'жен',
    }));
  }
  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: {
        results: true,
      },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const existingStudent = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return this.prisma.student.update({
      where: { id },
      data: {
        firstName: updateStudentDto.firstName,
        lastName: updateStudentDto.lastName,
        middleName: updateStudentDto.middleName,
        classNumber: updateStudentDto.classNumber,
        classLetter: updateStudentDto.classLetter,
        birthDate: updateStudentDto.birthDate
          ? new Date(updateStudentDto.birthDate)
          : existingStudent.birthDate,
      },
    });
  }

  async remove(id: number) {
    const existingStudent = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return this.prisma.student.delete({
      where: { id },
    });
  }
}
