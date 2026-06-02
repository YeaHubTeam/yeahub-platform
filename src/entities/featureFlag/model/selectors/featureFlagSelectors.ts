import { State } from '@/shared/config';

import { Flag } from '../types/featureFlag';

export const getFeatureFlag = (flag: Flag) => (state: State) => state.featureFlag[flag];
