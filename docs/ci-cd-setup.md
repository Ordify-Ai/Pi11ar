# CI/CD Setup Guide

This guide will help you set up continuous integration and deployment (CI/CD) for your Next.js + Firebase template using GitHub Actions.

## Overview

The template includes GitHub Actions workflows for automated deployment:

1. **`firebase-hosting.yml`** - Automated deployment on merge to main (Recommended)
2. **`firebase-hosting-pull-request.yml`** - Pull request preview deployment

## Prerequisites

1. **GitHub Repository** - Your project must be in a GitHub repository
2. **Firebase Project** - A Firebase project with hosting enabled
3. **Firebase CLI** - Installed locally for token generation

## Setup Options

### Option 1: Automated Deployment (Recommended)

The template comes with pre-configured GitHub Actions workflows that use Firebase's official deployment action.

#### Step 1: Configure Firebase Hosting

```bash
# Use the template's Firebase project (for testing)
firebase use template-1ba82

# Or use your own Firebase project
firebase use your-project-id

# Initialize hosting
firebase init hosting
```

#### Step 2: Automatic Setup

When you run `firebase init hosting`, Firebase will:
- Create a service account for GitHub Actions
- Add the service account secret to your repository
- Generate the proper GitHub Actions workflows
- Configure hosting settings

#### Step 3: Verify Setup

1. Check your GitHub repository settings
2. Look for the secret `FIREBASE_SERVICE_ACCOUNT_TEMPLATE_1BA82` (or similar)
3. Check the Actions tab for the new workflow

#### Step 4: Test Deployment

1. Make a change to your code
2. Push to the `main` branch
3. The workflow will automatically deploy to Firebase Hosting

### Option 2: Using Your Own Firebase Project

If you want to use your own Firebase project instead of the template's:

#### Step 1: Create Your Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable hosting

#### Step 2: Configure Your Project

```bash
# Use your own Firebase project
firebase use your-project-id

# Initialize hosting
firebase init hosting
```

#### Step 3: Update Configuration

The `firebase init hosting` command will:
- Create a service account for your project
- Add the service account secret to your repository
- Generate the proper GitHub Actions workflows
- Configure hosting settings

#### Step 4: Test Deployment

1. Make a change to your code
2. Push to the `main` branch
3. The workflow will automatically deploy to your Firebase project



## Workflow Details

### Main Deployment Workflow (`firebase-hosting.yml`)

```yaml
name: Deploy to Firebase Hosting on merge
on:
  push:
    branches:
      - main
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_TEMPLATE_1BA82 }}
          channelId: live
          projectId: template-1ba82
```

### Pull Request Workflow (`firebase-hosting-pull-request.yml`)

```yaml
name: Deploy to Firebase Hosting on PR
on: pull_request
jobs:
  build_and_preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_TEMPLATE_1BA82 }}
          channelId: preview
          projectId: template-1ba82
```

## Environment-Specific Deployments

### Production (main branch)
- Deploys to production hosting target
- Deploys to production Firebase Functions
- Uses production environment variables

### Development (dev branch)
- Deploys to development hosting target
- Deploys to development Firebase Functions
- Uses development environment variables

## Customization

### Adding Environment Variables

You can add environment variables to your workflow:

```yaml
- name: Build Next.js app
  run: npm run build
  env:
    NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Adding Notifications

#### Slack Notifications

```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    channel: '#deployments'
    webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

#### Email Notifications

```yaml
- name: Send email notification
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 587
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    subject: Deployment ${{ job.status }}
    to: ${{ secrets.NOTIFICATION_EMAIL }}
    from: GitHub Actions
    body: |
      Deployment to ${{ github.ref }} has ${{ job.status }}
      View the deployment: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
```

### Conditional Deployments

You can add conditions to your deployments:

```yaml
- name: Deploy to Firebase Hosting
  if: contains(github.event.head_commit.message, '[deploy]')
  run: firebase deploy --only hosting --project ${{ secrets.FIREBASE_PROJECT_ID }}
```

## Troubleshooting

### Common Issues

1. **"Firebase project not found"**
   - Check that `FIREBASE_PROJECT_ID` secret is correct
   - Verify you have access to the Firebase project

2. **"Permission denied"**
   - For simple workflow: Regenerate Firebase token
   - For full workflow: Check service account permissions

3. **"Build failed"**
   - Check that all dependencies are in `package.json`
   - Verify the build script works locally

4. **"Deployment failed"**
   - Check Firebase project configuration
   - Verify hosting is enabled in Firebase Console

### Debugging

1. **Check GitHub Actions logs**
   - Go to **Actions** tab in your repository
   - Click on the failed workflow run
   - Review the step-by-step logs

2. **Test locally**
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

3. **Verify secrets**
   - Double-check all GitHub secrets are set correctly
   - Ensure no extra spaces or characters

## Security Best Practices

1. **Never commit secrets** to your repository
2. **Use least privilege** for service accounts
3. **Rotate tokens** regularly
4. **Monitor deployments** for unauthorized changes
5. **Use branch protection** rules

## Cost Optimization

1. **Use Firebase emulators** for development
2. **Monitor Firebase usage** and costs
3. **Set up billing alerts**
4. **Optimize build times** with caching

## Next Steps

After setting up CI/CD:

1. **Set up branch protection** rules
2. **Configure deployment notifications**
3. **Add automated testing**
4. **Set up monitoring and alerts**
5. **Configure custom domains**

---

For more information, see:
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Firebase CLI Documentation](https://firebase.google.com/docs/cli)
- [Google Cloud IAM Documentation](https://cloud.google.com/iam/docs) 