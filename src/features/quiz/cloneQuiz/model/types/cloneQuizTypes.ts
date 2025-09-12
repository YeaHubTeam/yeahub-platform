import { Quiz } from '@/entities/quiz';

export type CloneQuizResponse = Omit<Quiz, 'endDate'>;
