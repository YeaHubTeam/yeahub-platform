import { authHandlers } from '@/entities/auth';
import { questionHandlers } from '@/entities/question';
import { interviewHandlers } from '@/entities/quiz';

import { questionDeleteHandlers } from '@/features/question/deleteQuestion';

export const handlers = [
	...authHandlers,
	...interviewHandlers,
	...questionHandlers,
	...questionDeleteHandlers,
];
