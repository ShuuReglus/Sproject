import { Amplify } from 'aws-amplify';
import awsExports from '@/aws-exports';

// Amplifyを設定
Amplify.configure(awsExports);

export default Amplify;
