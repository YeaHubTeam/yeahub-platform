import { Flex } from '@/shared/ui/Flex';

import {
	Vacancy,
	VacancyActions,
	VacancySource,
	VacancyStats,
	VacancyTags,
} from '@/entities/vacancy';
import { VacancyHeader } from '@/entities/vacancy';

interface VacancyMainInfoProps {
	vacancy: Vacancy;
}
export const VacancyMainInfo = ({ vacancy }: VacancyMainInfoProps) => {
	return (
		<Flex gap="20" direction="column">
			<VacancyHeader company={vacancy.company} title={vacancy.title} salary={vacancy.salary} />
			<VacancyActions applyVacancyUrl={vacancy.applyVacancyUrl} />
			<VacancyTags
				area={vacancy.area}
				grade={vacancy.grade}
				employmentForm={vacancy.employmentForm}
				industry={vacancy.industry}
				companyType={vacancy.companyType}
			/>
			<VacancyStats preparation={vacancy.preparation} />
			<VacancySource
				source={vacancy.source}
				publishDate={vacancy.sourcePublishedAt}
				workFormat={vacancy.workFormat}
				internship={vacancy.internship}
			/>
		</Flex>
	);
};
