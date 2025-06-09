import { Amplify } from 'aws-amplify';
import awsExports from '@/src/swifthome/aws-exports';

export const configureAmplify = () => {
  if (typeof window !== 'undefined') {
    Amplify.configure(awsExports);
  }
};