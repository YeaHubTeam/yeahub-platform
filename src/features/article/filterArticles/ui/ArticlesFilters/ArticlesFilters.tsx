import { Flex } from '@/shared/ui/Flex';

import { ArticlesFilterParams } from '@/entities/article';
import { SkillsListField } from '@/entities/skill';
import { SpecializationsMultiListField } from '@/entities/specialization';

import { ArticleContentTypeFilter } from '../ArticleContentTypeFilter/ArticleContentTypeFilter';
import { ArticleFormatFilter } from '../ArticleFormatFilter/ArticleFormatFilter';
import { ArticleTopicsFilter } from '../ArticleTopicsFilter/ArticleTopicsFilter';

interface ArticlesFiltersProps {
	filters: ArticlesFilterParams;
	onChangeSpecializations: (specializations?: ArticlesFilterParams['specializations']) => void;
	onChangeSkills: (skills?: ArticlesFilterParams['skills']) => void;
	onChangeTopics: (topics?: ArticlesFilterParams['topics']) => void;
	onChangeContentType: (contentType?: ArticlesFilterParams['contentType']) => void;
	onChangeFormat: (format?: ArticlesFilterParams['format']) => void;
}

export const ArticlesFilters = ({
	filters,
	onChangeSpecializations,
	onChangeSkills,
	onChangeTopics,
	onChangeContentType,
	onChangeFormat,
}: ArticlesFiltersProps) => {
	const { specializations, skills, topics, contentType, format } = filters;

	return (
		<Flex direction="column" gap="24">
			<SpecializationsMultiListField
				selectedSpecializations={specializations}
				onChangeSpecializations={onChangeSpecializations}
			/>
			<SkillsListField
				selectedSkills={skills}
				onChangeSkills={onChangeSkills}
				selectedSpecialization={specializations}
			/>
			<ArticleTopicsFilter selectedTopics={topics} onChangeTopics={onChangeTopics} />
			<ArticleContentTypeFilter
				selectedContentType={contentType}
				onChangeContentType={onChangeContentType}
			/>
			<ArticleFormatFilter selectedFormat={format} onChangeFormat={onChangeFormat} />
		</Flex>
	);
};
