import { formatDate } from '@/shared/libs';

import { Company } from '@/entities/company';

export interface CompaniesTableItem {
	id: string;
	imageSrc: string;
	title: string;
	authorId: string;
	author: string;
	createdAt: string;
}

export const mapCompaniesToTableItems = (companies: Company[]): CompaniesTableItem[] => {
	return companies.map((company) => ({
		id: company.id,
		imageSrc: company.imageSrc ?? '',
		title: company.title,
		authorId: company.createdBy?.id ?? '',
		author: company.createdBy?.username ?? '-',
		createdAt: company.createdAt ? formatDate(new Date(company.createdAt), 'dd.MM.yyyy') : '-',
	}));
};
