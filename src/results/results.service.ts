import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createResultDto: CreateResultDto) {
    const { studentId, normativeId, resultValue, quarter } = createResultDto;

    // Проверяем, существует ли студент
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    // Проверяем, существует ли норматив
    const normative = await this.prisma.normative.findUnique({
      where: { id: normativeId },
      include: { grades: true }, // Включаем связанные оценки
    });
    if (!normative) {
      throw new NotFoundException(`Normative with ID ${normativeId} not found`);
    }

    // Сортируем оценки по возрастанию resultValue (для нормативов, где меньшее значение лучше)
    const sortedGrades = normative.grades.sort(
      (a, b) => a.resultValue - b.resultValue,
    );

    // Определяем оценку на основе результата
    let gradeId: number | null = null;
    for (const grade of sortedGrades) {
      if (resultValue <= grade.resultValue) {
        gradeId = grade.id;
        break;
      }
    }

    // Если результат хуже всех оценок, ставим минимальную оценку (опционально)
    if (!gradeId && sortedGrades.length > 0) {
      gradeId = sortedGrades[sortedGrades.length - 1].id;
    }

    // Создаем результат
    const result = await this.prisma.result.create({
      data: {
        studentId,
        normativeId,
        resultValue,
        quarter,
        gradeId,
      },
      include: {
        grade: true, // Включаем оценку в ответ
      },
    });

    return result;
  }

  findAll() {
    return `This action returns all results`;
  }

  findOne(id: number) {
    return `This action returns a #${id} result`;
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
