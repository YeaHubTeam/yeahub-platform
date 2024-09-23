import { Flex } from '@/shared/ui/Flex';

import { EducationFormField } from '@/entities/education';

import styles from './EducationTabForm.module.css';

export const EducationTabFrom = () => {
	return (
		<Flex direction="column" gap="120">
			<Flex>
				<div className={styles.description}>
					<h3>Где ты учился(-ась)</h3>
					<p>
						Мы понимаем что в IT образование уступает в приоритете навыкам, но это так же важно.
					</p>
				</div>
				<EducationFormField />
			</Flex>
		</Flex>
	);
};
