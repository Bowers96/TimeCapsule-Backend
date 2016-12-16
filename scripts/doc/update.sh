#!/bin/bash

API="http://localhost:4741"
URL_PATH="/docs"
ID="585402d35a6091b5c54ca485"
TITLE="TITLE1"
URL="URL1"
CATEGORY="CATEGORY1"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --data '{
    "doc": {
      "title": "'"${TITLE}"'",
      "url": "'"${URL}"'",
      "category": "'"${CATEGORY}"'"
    }
  }'

echo
