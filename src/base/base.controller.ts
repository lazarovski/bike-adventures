import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('base')
export abstract class BaseController {
  @Get()
  getAll(): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  get(@Param('id') id: string): string {
    return id;
  }

  @Post('create')
  create(@Body() body: string): string {
    return body;
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() body: string): string {
    return body;
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): string {
    return id;
  }
}
