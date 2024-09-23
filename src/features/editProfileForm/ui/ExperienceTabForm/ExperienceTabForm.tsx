import { Flex } from '@/shared/ui/Flex';

import { ExperienceFormField } from '@/entities/experience';

import styles from './ExperienceTabForm.module.css';

export const ExperienceTabForm = () => {
	return (
		<Flex direction="column" gap="120">
			<Flex>
				<div className={styles.description}>
					<h3>Где ты работал(-а)</h3>
					<p>Сюда мы тоже что-нибудь классное придумаем</p>
				</div>
				<ExperienceFormField />
			</Flex>
		</Flex>
	);
};
