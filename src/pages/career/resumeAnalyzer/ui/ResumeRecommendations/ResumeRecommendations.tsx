import { Flex } from '@/shared/ui/Flex';
import { FormField } from '@/shared/ui/FormField';
import { StatusChip } from '@/shared/ui/StatusChip';
import { Text } from '@/shared/ui/Text';

import { Resume } from '../../model/types/resumeAnalyze';

interface ResumeRecommendationsProps {
	resumeInfo: Resume;
}

export const ResumeRecommendations = ({ resumeInfo }: ResumeRecommendationsProps) => {
	const getStatusColor = (value: number) => {
		if (value < 50) {
			return 'red';
		}

		if (value >= 50 && value < 85) {
			return 'yellow';
		}

		if (value >= 85) {
			return 'green';
		}

		return 'yellow';
	};

	return (
		<Flex direction="column" gap="30">
			<FormField label="ФИО">
				<Text variant="body3">{resumeInfo.fullName}</Text>
			</FormField>
			<FormField label="Должность">
				<Text variant="body3">{resumeInfo.currentPosition}</Text>
			</FormField>
			<FormField label="Опыт работы">
				<Text variant="body3">{resumeInfo.experienceYears}</Text>
			</FormField>
			<FormField label="Соответствие по популярным навыкам">
				<Flex gap="10" wrap="wrap">
					{resumeInfo.topSkillsMatch.map((skill) => (
						<StatusChip
							size="medium"
							key={skill.skill}
							status={{ variant: skill.found ? 'green' : 'red', text: skill.skill }}
						/>
					))}
				</Flex>
			</FormField>
			<FormField label="Общая оценка ATS">
				<StatusChip
					size="medium"
					status={{
						variant: getStatusColor(resumeInfo.atsScore.total),
						text: `${resumeInfo.atsScore.total}%`,
					}}
				/>
			</FormField>
			<FormField label="Процент совпадения навыков">
				<StatusChip
					size="medium"
					status={{
						variant: getStatusColor(resumeInfo.atsScore.skillsMatch),
						text: `${resumeInfo.atsScore.skillsMatch}%`,
					}}
				/>
			</FormField>
			<FormField label="Качество описания опыта">
				<StatusChip
					size="medium"
					status={{
						variant: getStatusColor(resumeInfo.atsScore.experienceQuality),
						text: `${resumeInfo.atsScore.experienceQuality}%`,
					}}
				/>
			</FormField>
			<FormField label="Наличие ключевых слов">
				<StatusChip
					size="medium"
					status={{
						variant: getStatusColor(resumeInfo.atsScore.keywordsDensity),
						text: `${resumeInfo.atsScore.keywordsDensity}%`,
					}}
				/>
			</FormField>
			<FormField label="Рекомендации по улучшению резюме" direction="column">
				<Flex gap="10" direction="column">
					{resumeInfo.recommendations.map((recommendation, index) => (
						<Text key={index} variant="body3">
							{`${index + 1}. ${recommendation}`}
						</Text>
					))}
				</Flex>
			</FormField>
			<FormField label="Общий вердикт" direction="column">
				<Text variant="body4">{resumeInfo.verdict}</Text>
			</FormField>
		</Flex>
	);
};
