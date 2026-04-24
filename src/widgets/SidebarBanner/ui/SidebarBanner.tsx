import { Guru, GurusBanner, NewGuru, NewGuruBanner } from '@/entities/guru';

interface SidebarBannerProps {
	guru?: Guru;
	newGuru?: NewGuru;
}

const specializationsForNewBanner = [11];

export const SidebarBanner = ({ guru, newGuru }: SidebarBannerProps) => {
	const isNewBanner =
		guru?.specializations?.some((specialization) =>
			specializationsForNewBanner.includes(specialization),
		) || false;

	if (isNewBanner && newGuru) {
		return <NewGuruBanner guru={newGuru} />;
	}

	if (guru) {
		return <GurusBanner gurus={[guru]} />;
	}

	return null;
};
