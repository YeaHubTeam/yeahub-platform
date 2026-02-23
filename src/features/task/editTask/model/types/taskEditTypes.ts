import { CreateOrEditTaskFormValues, Task } from '@/entities/task';

export type EditTaskFormValues = CreateOrEditTaskFormValues;

export type EditTaskBodyRequest = EditTaskFormValues;
export type EditTaskResponse = Task;
