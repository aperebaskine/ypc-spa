rmdir /S /Q src\\app\\generated
openapi-generator-cli generate -i http://localhost:8080/ypc-rest-api/api/openapi.json -g typescript-angular -o ./src/app/generated