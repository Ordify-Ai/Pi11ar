# Ordify Firebase Functions

This directory contains Firebase Functions for the Ordify web application.

## Available Functions

### `notifySlack`

A function that sends form data from the Enterprise contact form to a Slack channel using webhooks.

**Endpoint:** `https://us-central1-ordify-web.cloudfunctions.net/notifySlack`

**Method:** POST

**Body:**
```json
{
  "companyName": "Company Name",
  "email": "contact@example.com",
  "companySize": "1-10 employees",
  "message": "Inquiry details"
}
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up the required secrets:
```bash
firebase functions:secrets:set SLACK_WEBHOOK_URL
```
When prompted, enter your Slack webhook URL.

## Local Development

To run the functions locally for testing:

```bash
npm run serve
```

This will start the Firebase emulator, and your function will be available at:
`http://localhost:5001/ordify-web/us-central1/notifySlack`

## Deployment

To deploy the functions to Firebase:

```bash
npm run deploy
```

After deployment, your function will be available at:
`https://us-central1-ordify-web.cloudfunctions.net/notifySlack`

## Testing

You can test the webhook with a curl command:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"companyName":"Test Company","email":"test@example.com","companySize":"1-10 employees","message":"This is a test message"}' http://localhost:5001/ordify-web/us-central1/notifySlack
``` 