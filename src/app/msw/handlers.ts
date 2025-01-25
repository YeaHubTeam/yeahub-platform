import { authHandlers } from '@/entities/auth';
import { questionHandlers } from '@/entities/question';
import { interviewHandlers } from '@/entities/quiz';

import { questionCreateHandlers } from '@/features/question/createQuestion';
import { questionDeleteHandlers } from '@/features/question/deleteQuestion';
import { questionEditHandlers } from '@/features/question/editQuestion';

export const handlers = [
	...authHandlers,
	...interviewHandlers,
	...questionHandlers,
	...questionCreateHandlers,
	...questionDeleteHandlers,
	...questionEditHandlers
];
