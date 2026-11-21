import { Topic } from '@/entities/topic';

export const mapTopicsToTableItems = (topics: Topic[]) => {
	return topics.map(({ id, title, skill, createdBy, createdAt }) => ({
		id,
		title,
		skill: {
			id: skill.id,
			title: skill.title,
		},
		author: createdBy ? { id: createdBy.id, username: createdBy.username } : undefined,
		createdAt,
	}));
};
