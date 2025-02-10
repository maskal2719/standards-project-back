import { Module } from '@nestjs/common';
import { NormativesService } from './normatives.service';
import { NormativesController } from './normatives.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [NormativesController],
  providers: [NormativesService, PrismaService],
})
export class NormativesModule {}
