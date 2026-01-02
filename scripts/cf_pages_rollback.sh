#!/bin/bash
# cf_pages_rollback.sh
# Rollback Cloudflare Pages deployment to the previous successful commit/deployment.

PROJECT_NAME="slavkokernel-v7"
API_TOKEN=${CLOUDFLARE_API_TOKEN}
ACCOUNT_ID=${CLOUDFLARE_ACCOUNT_ID}

if [ -z "$API_TOKEN" ] || [ -z "$ACCOUNT_ID" ]; then
  echo "Error: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID must be set."
  exit 1
fi

echo "Fetching deployments for ${PROJECT_NAME}..."
deployments=$(curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments" \
  -H "Authorization: Bearer ${API_TOKEN}")

# Extract the second most recent deployment ID (since the first is the current/failed one)
previous_deployment_id=$(echo $deployments | jq -r '.result[1].id')

if [ -z "$previous_deployment_id" ] || [ "$previous_deployment_id" == "null" ]; then
  echo "Error: Could not find a previous deployment to rollback to."
  exit 1
fi

echo "Rolling back to deployment ID: ${previous_deployment_id}"

rollback_response=$(curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments/${previous_deployment_id}/rollback" \
  -H "Authorization: Bearer ${API_TOKEN}")

success=$(echo $rollback_response | jq -r '.success')

if [ "$success" == "true" ]; then
  echo "Successfully rolled back to ${previous_deployment_id}."
else
  echo "Rollback failed."
  echo $rollback_response
  exit 1
fi
