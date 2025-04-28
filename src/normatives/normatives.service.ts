import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNormativeDto } from './dto/create-normative.dto';
import { UpdateNormativeDto } from './dto/update-normative.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NormativesService {
  constructor(private readonly prisma: PrismaService) {}

  // Создание нового норматива
  async create(createNormativeDto: CreateNormativeDto) {
    const { name, grades } = createNormativeDto;

    // Проверяем, что переданы возрастные группы
    if (!grades || grades.length === 0) {
      throw new BadRequestException('At least one grade must be provided');
    }

    // Создаем норматив и связанные возрастные группы
    return this.prisma.normative.create({
      data: {
        name,
        grades: {
          create: grades.map((grade) => ({
            classGroup: grade.classGroup,
            resultValue: grade.resultValue,
            grade: grade.grade,
          })),
        },
      },
      include: {
        grades: true, // Включаем созданные возрастные группы в ответ
      },
    });
  }

  // Получение всех нормативов
  async findAll() {
    return this.prisma.normative.findMany({
      include: {
        grades: true, // Включаем связанные оценки
        results: true, // Включаем связанные результаты
      },
    });
  }

  // Получение одного норматива по ID
  async findOne(id: number) {
    const normative = await this.prisma.normative.findUnique({
      where: { id },
      include: {
        grades: true, // Включаем связанные оценки
        results: true, // Включаем связанные результаты
      },
    });

    if (!normative) {
      throw new NotFoundException(`Normative with ID ${id} not found`);
    }

    return normative;
  }

  // Обновление норматива по ID
  async update(id: number, updateNormativeDto: UpdateNormativeDto) {
    // Проверяем, существует ли норматив
    const existingNormative = await this.prisma.normative.findUnique({
      where: { id },
    });

    if (!existingNormative) {
      throw new NotFoundException(`Normative with ID ${id} not found`);
    }

    // Обновляем данные норматива
    return this.prisma.normative.update({
      where: { id },
      data: {
        name: updateNormativeDto.name,
      },
    });
  }

  // Удаление норматива по ID
  async remove(id: number) {
    // Проверяем, существует ли норматив
    const existingNormative = await this.prisma.normative.findUnique({
      where: { id },
    });

    if (!existingNormative) {
      throw new NotFoundException(`Normative with ID ${id} not found`);
    }

    // Удаляем норматив
    return this.prisma.normative.delete({
      where: { id },
    });
  }
}
