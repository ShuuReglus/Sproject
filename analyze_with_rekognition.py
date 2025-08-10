import uuid
import boto3
import os

AWS_REGION = os.getenv("AWS_REGION")
S3_BUCKET = os.getenv("S3_BUCKET_NAME")

s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=AWS_REGION
)

rekognition = boto3.client(
    "rekognition",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=AWS_REGION
)

def upload_to_s3(image_bytes, filename):
    key = f"uploads/{uuid.uuid4()}_{filename}"
    s3_client.put_object(Bucket=S3_BUCKET, Key=key, Body=image_bytes)
    return key

def analyze_image_s3(bucket, key):
    response = rekognition.detect_labels(
        Image={"S3Object": {"Bucket": bucket, "Name": key}},
        MaxLabels=10,
        MinConfidence=70
    )
    labels = [label["Name"] for label in response["Labels"]]
    return ", ".join(labels)
