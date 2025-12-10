import { DefaultBodyType, HttpResponse, http } from 'msw';

import { skillsMock } from '@/entities/skill/@x/question';

import { questionApiUrls } from '../../model/constants/question';
import { GetQuestionsBySpecializationCountResponse } from '../../model/types/question';

import { questionsMock } from './data';

export const getQuestionsSpecializationByIdCountMock = http.get<
	Record<string, string>,
	DefaultBodyType,
	GetQuestionsBySpecializationCountResponse
>(process.env.API_URL + questionApiUrls.getStatisticsQuestionsSpecializationById, ({ request }) => {
	const url = new URL(request.url);
	const pathParts = url.pathname.split('/');
	const specializationId = pathParts[pathParts.length - 1];

	const totalQuestions = questionsMock.data.reduce((acc, question) => {
		if (question.questionSpecializations.filter((q) => String(q.id) === specializationId)) {
			acc += question.questionSkills.length;
		}
		return acc;
	}, 0);

	const relevantSkills = skillsMock.data.reduce(
		(acc, q) => {
			if (q.specializations && q.specializations.some((r) => String(r.id) === specializationId)) {
				acc.push({ title: q.title, id: q.id });
			}
			return acc;
		},
		[] as { title: string; id: number }[],
	);

	const skillsQuestions = relevantSkills.map((skill) => ({
		skill: skill.title,
		count: questionsMock.data.reduce(
			(acc, q) => acc + (q.questionSkills.some((s) => s.id === skill.id) ? 1 : 0),
			0,
		),
	}));

	return HttpResponse.json({
		total: totalQuestions,
		skillsQuestions: skillsQuestions,
	});
});
