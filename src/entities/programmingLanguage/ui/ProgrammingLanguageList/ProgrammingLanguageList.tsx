import { Flex } from '@/shared/ui/Flex';
import { Tooltip } from '@/shared/ui/Tooltip';

import { ProgrammingLanguage } from '@/entities/programmingLanguage';

import styles from './ProgrammingLanguageList.module.css';

interface ProgrammingLanguageListProps {
	languages: ProgrammingLanguage[];
}

export const ProgrammingLanguageList = ({ languages }: ProgrammingLanguageListProps) => {
	const languagesTitles = languages.map((language) => language.name).join(', ');

	return (
		<Tooltip title={languagesTitles}>
			<Flex align="center" justify="center" gap="10" className={styles.list}>
				{languages.map((language) => (
					<img
						className={styles.image}
						key={language.id}
						src={language.imageSrc}
						alt={language.name}
						width="19px"
						height="19px"
					/>
				))}
			</Flex>
		</Tooltip>
	);
};
