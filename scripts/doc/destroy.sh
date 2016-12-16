#!/bin/bash

API="http://localhost:4741"
URL_PATH="/docs"
ID="585402d35a6091b5c54ca485"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json"
