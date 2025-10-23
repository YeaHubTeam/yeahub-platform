import ExperienceBanner from '@/shared/assets/images/landing/learning/expBanner.png';
import ExperienceIcon from '@/shared/assets/images/landing/learning/expIcon.png';
import LearningBanner from '@/shared/assets/images/landing/learning/learningBanner.png';
import LearningIcon from '@/shared/assets/images/landing/learning/learningIcon.png';
import ProcessBanner from '@/shared/assets/images/landing/learning/processBanner.png';
import ProcessIcon from '@/shared/assets/images/landing/learning/processIcon.png';
import ProjectBanner from '@/shared/assets/images/landing/learning/projectBanner.png';
import ProjectIcon from '@/shared/assets/images/landing/learning/projectIcon.png';
import TeamBanner from '@/shared/assets/images/landing/learning/teamBanner.png';
import TeamIcon from '@/shared/assets/images/landing/learning/teamIcon.png';
import TechnoBanner from '@/shared/assets/images/landing/learning/technoBanner.png';
import TechnoIcon from '@/shared/assets/images/landing/learning/technoIcon.png';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './AdvantagesBlock.module.css';

export const AdvantagesBlock = () => {
	const data = [
		{
			id: 1,
			cardIcon: ProcessIcon,
			cardBanner: ProcessBanner,
			cardTitle: 'Процессы как в IT-компаниях',
			cardDescription:
				'Работаем по Scrum: двухнедельные спринты, дейлики, планирование и общие синки между командами. Всё как в индустрии — а местами даже лучше.',
		},
		{
			id: 2,
			cardIcon: TechnoIcon,
			cardBanner: TechnoBanner,
			cardTitle: 'Современный стек',
			cardDescription:
				'Работаем с топовыми технологиями и инфраструктурой уровня enterprise. Kubernetes, Next.js и другие современные инструменты — всё, с чем вы столкнётесь в реальных компаниях.',
		},
		{
			id: 3,
			cardIcon: TeamIcon,
			cardBanner: TeamBanner,
			cardTitle: 'Командная работа',
			cardDescription:
				'На проекте есть все роли: Frontend, Backend, Design, QA, Mobile, SA/BA. Учимся работать вместе и строить продукт как настоящая команда.',
		},
		{
			id: 4,
			cardIcon: LearningIcon,
			cardBanner: LearningBanner,
			cardTitle: 'Обучение и поддержка',
			cardDescription:
				'Каждый ментор ведёт подопечных: даёт материалы, объясняет сложные темы, помогает расти и готовит к трудоустройству.',
		},
		{
			id: 5,
			cardIcon: ProjectIcon,
			cardBanner: ProjectBanner,
			cardTitle: 'Большой живой проект',
			cardDescription:
				'Это не учебный пет-проект, а целая система. Вы погружаетесь в реальный код и понимаете, как всё работает на практике.',
		},
		{
			id: 6,
			cardIcon: ExperienceIcon,
			cardBanner: ExperienceBanner,
			cardTitle: 'Настоящий опыт',
			cardDescription:
				'Учиться на реальных проектах вместо зубрёжки и однотипных пет-проектов вы получаете командный опыт, поддержку и знания, которые готовят к профессии.',
		},
	];
	return (
		<>
			<Flex direction="column" gap={'20'} className={styles.process}>
				<Text variant={'head2'}>{'YEAHUB — ТВОЯ ПЕРВАЯ КОМАНДА В IT'}</Text>
				<Text variant={'body3'} className={styles.description}>
					{
						'Мы создаём YeaHub айтишниками для айтишников. Опытные специалисты работают вместе с новичками, превращая обучение в практику: реальная разработка, командные процессы и живой продукт. Здесь нет типовых пет-проектов — вы проходите все этапы и получаете опыт, который ценится на настоящей работе.					'
					}
				</Text>
			</Flex>
			<Flex className={styles.container}>
				{data.map((item) => (
					<Card size={'medium'} key={item.id}>
						<img src={item.cardIcon} alt={'person'} className={styles.icon} />
						<Flex direction={'column'} gap={'10'}>
							<Text variant={'body5-strong'}>{item.cardTitle}</Text>
							<Text variant={'body3-accent'}>{item.cardDescription}</Text>
							<img src={item.cardBanner} alt={'personBanner'} className={styles.banner} />
						</Flex>
					</Card>
				))}
			</Flex>
		</>
	);
};
