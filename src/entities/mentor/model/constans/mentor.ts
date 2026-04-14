import mentor1 from '@/shared/assets/images/mentorBaner/mentorBanner1.png';
import mentor2 from '@/shared/assets/images/mentorBaner/mentorBanner2.png';
import mentor3 from '@/shared/assets/images/mentorBaner/mentorBanner3.png';
import mentor4 from '@/shared/assets/images/mentorBaner/mentorBanner4.png';
import mentor5 from '@/shared/assets/images/mentorBaner/mentorBanner5.png';
import mentor6 from '@/shared/assets/images/mentorBaner/mentorBanner6.png';
import mentor7 from '@/shared/assets/images/mentorBaner/mentorBanner7.png';
import mentor8 from '@/shared/assets/images/mentorBaner/mentorBanner8.png';
import mentor9 from '@/shared/assets/images/mentorBaner/mentorBanner9.png';

import { Mentor } from '../types/mentor';

export const mentor: Mentor = {
	specializations: 'Frontend developer',
	title: 'Ментор по Frontend',
	description:
		'Полное сопровождение до оффера — без дорогих курсов, с оплатой после трудоустройства',
	buttonText: 'Записаться на консультацию',
	icons: [
		mentor1,
		null,
		mentor2,
		mentor3,
		mentor4,
		mentor5,
		mentor6,
		mentor7,
		null,
		mentor8,
		null,
		mentor9,
	],
};
