import { authHandlers } from '@/entities/auth';
import { questionHandlers } from '@/entities/question';
import { interviewHandlers } from '@/entities/quiz';

export const handlers = [...authHandlers, ...interviewHandlers, ...questionHandlers];
