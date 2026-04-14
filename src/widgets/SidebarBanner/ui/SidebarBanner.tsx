import { Guru, GurusBanner } from '@/entities/guru';

interface SidebarBannerProps {
	guru?: Guru;
	isSpecialization11: boolean;
}

export const SidebarBanner = ({ guru, isSpecialization11 }: SidebarBannerProps) => {
	if (isSpecialization11) {
		return <div>ментор</div>;
	}

	if (guru) {
		return <GurusBanner gurus={[guru]} />;
	}

	return null;
};
