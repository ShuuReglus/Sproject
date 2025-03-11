import json
import openai

def lambda_handler(event, context):
    openai.api_key = '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'
    
    user_input = event['user_input']
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": user_input}]
    )
    
    ai_message = response['choices'][0]['message']['content']
    
    return {
        'statusCode': 200,
        'body': json.dumps({'message': ai_message})
    }
