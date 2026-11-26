import { formatDate } from '@/shared/libs';

import { Topic } from '@/entities/topic';

export interface TopicsTableItem {
	id: number;
	title: string;
	skill: {
		id: number;
		title: string;
	};
	author?: {
		id: string;
		username: string;
	};
	createdAt: string;
}

export const mapTopicsToTableItems = (topics: Topic[]): TopicsTableItem[] => {
	return topics.map(({ id, title, skill, createdBy, createdAt }) => ({
		id,
		title,
		skill: {
			id: skill.id,
			title: skill.title,
		},
		author: createdBy ? { id: createdBy.id, username: createdBy.username } : undefined,
		createdAt: createdAt ? formatDate(new Date(createdAt), 'dd.MM.yyyy') : '-',
	}));
};
