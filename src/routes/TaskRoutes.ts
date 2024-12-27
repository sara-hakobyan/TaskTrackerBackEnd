import { Request, Response, Router } from "express";
import { IResponseData, Task } from "../types";
import { validateTaskInput } from "../middlewares/validateTasks";
import {
  errorResponse,
  successResponse,
} from "../helpers/resposnsestatusgenerator";
import TaskService from "../services/TaskService";

class TaskRoutes {
  private router: Router;
  private taskService: TaskService;

  constructor() {
    this.router = Router();
    this.taskService = new TaskService();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", this.getAllTasks.bind(this));
    this.router.post("/", validateTaskInput, this.createTask.bind(this));
    this.router.put("/:id", validateTaskInput, this.updateTask.bind(this));
    this.router.delete("/:id", this.deleteTask.bind(this));
  }

  private async getAllTasks(
    req: Request,
    res: Response<IResponseData<Task[] | null>>
  ): Promise<void> {
    try {
      const tasks = await this.taskService.getTasks();
      if (tasks.length === 0) {
        successResponse(res, 200, "No tasks created.", null);
        return;
      }
      const quantity = tasks.length;
      successResponse(
        res,
        200,
        `${quantity} task${quantity > 1 ? "s" : ""} found.`,
        tasks
      );
    } catch (error) {
      errorResponse(res, 500, (error as Error).message);
    }
  }

  private async createTask(
    req: Request,
    res: Response<IResponseData<Task | null>>
  ): Promise<void> {
    const { title, color, completed } = req.body;
    try {
      const newTask = await this.taskService.createTask({
        title,
        color,
        completed,
      });
      successResponse(res, 201, "Task created.", newTask);
    } catch (error) {
      errorResponse(res, 400, (error as Error).message);
    }
  }

  private async updateTask(
    req: Request,
    res: Response<IResponseData<Task | null>>
  ): Promise<void> {
    const { id } = req.params;
    const { title, color, completed } = req.body;

    try {
      const updatedTask = await this.taskService.updateTask(parseInt(id, 10), {
        title,
        color,
        completed,
      });
      successResponse(res, 200, "Task updated.", updatedTask);
    } catch (error) {
      errorResponse(res, 404, (error as Error).message);
    }
  }

  private async deleteTask(
    req: Request,
    res: Response<IResponseData<boolean>>
  ): Promise<void> {
    const { id } = req.params;

    try {
      await this.taskService.deleteTask(Number(id));
      successResponse(res, 200, "Task deleted.", null);
    } catch (error) {
      errorResponse(res, 404, (error as Error).message);
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}

const taskRoutes = new TaskRoutes();
export default taskRoutes.getRouter();
