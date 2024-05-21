# Nestia Bug Report #906

1. npm i
2. npm run bug

[issue](https://github.com/samchon/nestia/issues/906)

```
tsc -p ./tsconfig.build.json 명령어 실행시에는 @Prisma/* 경로가 정상적으로 변환됩니다.
=> ../../../prisma/clinet
하지만 nestia swagger 명령을 수행할 경우, @Prisma/*에 depth가 하나 더 생기는 현상이 발생합니다.
=> ../../../../prisma/client
```
