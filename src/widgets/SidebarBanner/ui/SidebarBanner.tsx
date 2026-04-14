import { Guru, GurusBanner } from '@/entities/guru';
import { MentorBanner } from '@/entities/mentor';

interface SidebarBannerProps {
	guru?: Guru;
	isSpecialization11: boolean;
}

export const SidebarBanner = ({ guru, isSpecialization11 }: SidebarBannerProps) => {
	if (isSpecialization11) {
		return <MentorBanner />;
	}

	if (guru) {
		return <GurusBanner gurus={[guru]} />;
	}

	return null;
};
