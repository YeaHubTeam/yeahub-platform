import { Flex } from '@/shared/ui/Flex';

import { Profile } from '@/entities/auth';

import { ProfileCard } from '../ProfileCard/ProfileCard';

interface ProfilesListProps {
	profiles: Profile[];
	isEmptySpecialization: (id: number) => boolean;
	className?: string;
}

export const ProfilesList = ({ profiles, isEmptySpecialization, className }: ProfilesListProps) => {
	return (
		<Flex direction="column" gap="14" className={className}>
			{profiles.map((profile) => (
				<ProfileCard
					key={profile.id}
					isActive={Boolean(profile.isActive)}
					profileId={profile.id}
					specializationId={profile.specializationId}
					isEmptySpecialization={isEmptySpecialization(profile.specializationId)}
				/>
			))}
		</Flex>
	);
};
