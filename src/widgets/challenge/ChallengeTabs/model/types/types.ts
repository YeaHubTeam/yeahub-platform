import type { Challenge } from '@/entities/challenge';

export type ChallengeTabId = 'description' | 'solutions';

export type ChallengeTabsProps = {
	challenge: Challenge;
	solutions?: string[];
};
