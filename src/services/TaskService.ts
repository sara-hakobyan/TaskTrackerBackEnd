import { PrismaClient } from "@prisma/client";

export interface TaskInput {
  title: string;
  color: string;
  completed: boolean;
}

class TaskService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getTasks() {
    return this.prisma.task.findMany();
  }

  async createTask(data: TaskInput) {
    return this.prisma.task.create({ data });
  }

  async updateTask(id: number, data: TaskInput) {
    const record = await this.prisma.task.findUnique({ where: { id } });
    if (!record) {
      throw new Error("Record not found");
    }
    return this.prisma.task.update({ where: { id }, data });
  }

  async deleteTask(id: number) {
    const record = await this.prisma.task.findUnique({ where: { id } });
    if (!record) {
      throw new Error("Record not found");
    }
    return this.prisma.task.delete({ where: { id } });
  }
}

export default TaskService;
