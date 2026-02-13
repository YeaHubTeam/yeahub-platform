import { Chip } from '@/shared/ui/Chip';
import { Flex } from '@/shared/ui/Flex';

import { ProgrammingLanguage } from '../../model/types/programmingLanguage';

interface ProgrammingLanguageChipListProps {
	languages: ProgrammingLanguage[];
	onClick?: (languageId: number) => void;
}

export const ProgrammingLanguageChipList = ({
	languages,
	onClick,
}: ProgrammingLanguageChipListProps) => {
	return (
		<Flex componentType="ul" gap="10" wrap="wrap">
			{languages?.map((language) => {
				return (
					<li key={language.id}>
						<Chip
							onClick={() => onClick?.(language.id)}
							label={language.name}
							theme="primary"
							active
							prefix={
								language.imageSrc && (
									<img
										style={{ width: 20, height: 20 }}
										src={language.imageSrc}
										alt={language.name}
									/>
								)
							}
						/>
					</li>
				);
			})}
		</Flex>
	);
};
