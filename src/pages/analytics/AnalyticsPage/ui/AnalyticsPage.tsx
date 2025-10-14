import { PopularSkills } from '@/widgets/analytics/PopularSkills';
import { SkillsProficiency } from '@/widgets/analytics/SkillsProficiency';

export const AnalyticsPage = () => {
	return (
		<div>
			<SkillsProficiency />
			<PopularSkills />
		</div>
	);
};
