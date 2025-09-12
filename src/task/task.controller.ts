import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { MoveToStateDto } from './dto/move-to-state.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // 2.1
  @Get('all')
  findAll() {
    return this.taskService.findAll();
  }

  // 2.2
  @Get('not-ready')
  findNotReady() {
    return this.taskService.findNotReady();
  }

  // 2.3
  @Get('ready')
  findReady() {
    return this.taskService.findReady();
  }

  // 2.4
  @Get('archive')
  findArchived() {
    return this.taskService.findArchived();
  }

  // 2.5
  @Post('add')
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }

  // 2.6
  @Post('add-to-ready')
  moveToReady(@Body() dto: MoveToStateDto) {
    return this.taskService.moveToReady(dto.id);
  }

  // 2.7
  @Post('add-to-archive')
  moveToArchive(@Body() dto: MoveToStateDto) {
    return this.taskService.moveToArchive(dto.id);
  }
}
