import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Translation, Vacancies, i18Namespace } from '@/shared/config';
import { Button } from '@/shared/ui/Button';
import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { MAX_SHOW_LIMIT_KEYWORDS } from '../../model/constants/vacancyConstants';
import { VacancyAiProfile } from '../../model/types/vacancy';

interface VacancyKeywordProps {
	keywords: VacancyAiProfile['keywords'];
}
export const VacancyKeywords = ({ keywords }: VacancyKeywordProps) => {
	const { t } = useTranslation(i18Namespace.vacancies);
	const { t: tCommon } = useTranslation(i18Namespace.translation);

	const [showAll, setShowAll] = useState(false);

	if (!keywords.length) return null;

	const visibleKeywords = showAll ? keywords : keywords.slice(0, MAX_SHOW_LIMIT_KEYWORDS);
	const shouldShowButton = keywords.length > MAX_SHOW_LIMIT_KEYWORDS;

	return (
		<Flex gap="20" direction="column">
			<Text variant="body5-accent" color="black-900">
				{t(Vacancies.KEYWORDS_TITLE)}
			</Text>
			<Flex gap="12" direction="column" align="start">
				<Flex wrap="wrap" gap="12" componentType="ul">
					{visibleKeywords.map((keyword) => (
						<li key={keyword}>
							<Chip label={keyword} /> {/* disablePointer  */}
						</li>
					))}
				</Flex>
				{shouldShowButton && (
					<Button variant="link" onClick={() => setShowAll((prev) => !prev)}>
						{showAll ? tCommon(Translation.HIDE) : tCommon(Translation.SHOW_ALL)}
					</Button>
				)}
			</Flex>
		</Flex>
	);
};
