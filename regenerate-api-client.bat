rmdir /S /Q src\\app\\generated
openapi-generator-cli generate -i https://informaticapinguela.es/ypc-rest-api/api/openapi.json -g typescript-angular -o ./src/app/generated