import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NormativesService } from './normatives.service';
import { CreateNormativeDto } from './dto/create-normative.dto';
import { UpdateNormativeDto } from './dto/update-normative.dto';

@Controller('normatives')
export class NormativesController {
  constructor(private readonly normativesService: NormativesService) {}

  @Post()
  create(@Body() createNormativeDto: CreateNormativeDto) {
    return this.normativesService.create(createNormativeDto);
  }

  @Get()
  findAll() {
    return this.normativesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.normativesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNormativeDto: UpdateNormativeDto,
  ) {
    return this.normativesService.update(+id, updateNormativeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.normativesService.remove(+id);
  }
}
