import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findNotReady(): Promise<Task[]> {
    return this.taskModel.find({ redy: false, archive: false }).exec();
  }

  async findReady(): Promise<Task[]> {
    return this.taskModel.find({ redy: true, archive: false }).exec();
  }

  async findArchived(): Promise<Task[]> {
    return this.taskModel.find({ archive: true }).exec();
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const created = new this.taskModel(dto);
    return created.save();
  }

  async moveToReady(id: string): Promise<Task> {
    const updated = await this.taskModel
      .findByIdAndUpdate(
        id,
        { $set: { redy: true, archive: false } },
        { new: true },
      )
      .exec();
    if (!updated) throw new NotFoundException('Task not found');
    return updated;
  }

  async moveToArchive(id: string): Promise<Task> {
    const updated = await this.taskModel
      .findByIdAndUpdate(id, { $set: { archive: true } }, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Task not found');
    return updated;
  }
}
