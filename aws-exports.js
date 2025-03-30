const awsmobile = {
    "aws_project_region": "ap-northeast-1",
    "aws_appsync_graphqlEndpoint": "https://3tx5q4e3svadxo4foavny2ce6u.appsync-api.us-east-1.amazonaws.com/graphql",
    "aws_appsync_region": "ap-northeast-1", // こちらもリージョンを統一
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "da2-k2spj2soczgtfhwvnm4puxongu",
    "aws_cognito_identity_pool_id": "us-east-1:0ab7fa0b-477f-45a3-841d-bbbecd0ec793",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_YmcPxZiQI",
    "aws_user_pools_web_client_id": "4qlfvt4g2mckd73r10piikrql1",
    "oauth": {},
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ],
    // S3の設定追加
    "aws_s3": {
        "bucket": "sproject-app-image-storage",
        "region": "ap-northeast-1"
    }
};

export default awsmobile;

