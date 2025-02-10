import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { NormativesModule } from './normatives/normatives.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [StudentsModule, NormativesModule, ResultsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
