import { authHandlers } from '@/entities/auth';
import { questionHandlers } from '@/entities/question';
import { interviewHandlers } from '@/entities/quiz';

import { questionCreateHandlers } from '@/features/question/createQuestion';

export const handlers = [
	...authHandlers,
	...interviewHandlers,
	...questionHandlers,
	...questionCreateHandlers,
];
