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
        fullName: createStudentDto.fullName,
        class: createStudentDto.class,
        birthDate: createStudentDto.birthDate
          ? new Date(createStudentDto.birthDate)
          : new Date('1992-02-28'),
      },
      include: {
        results: true,
      },
    });
  }

  async findAll() {
    return this.prisma.student.findMany();
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
        fullName: updateStudentDto.fullName,
        class: updateStudentDto.class,
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
