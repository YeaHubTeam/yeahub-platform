import { CreateOrEditTaskFormValues, Task } from '@/entities/task';

export type CreateTaskFormValues = Omit<CreateOrEditTaskFormValues, 'id'>;

export type CreateTaskBodyRequest = CreateTaskFormValues;
export type CreateTaskResponse = Task;
