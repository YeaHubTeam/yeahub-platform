import { authHandlers } from '@/entities/auth';
import { interviewHandlers } from '@/entities/quiz';

export const handlers = [...authHandlers, ...interviewHandlers];
