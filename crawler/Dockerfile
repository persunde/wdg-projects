# syntax=docker/dockerfile:1-experimental
FROM golang:1.14.1-buster AS base
WORKDIR /src
ENV CGO_ENABLED=1
COPY go.* .
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download

FROM base AS build
RUN --mount=target=. \
    --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go build -o /out/wdg-crawler .

# FROM base AS unit-test
# RUN --mount=target=. \
#     --mount=type=cache,target=/go/pkg/mod \
#     --mount=type=cache,target=/root/.cache/go-build \
#     mkdir /out && go test -v -coverprofile=/out/cover.out ./...

# FROM golangci/golangci-lint:v1.31.0-alpine AS lint-base

# FROM base AS lint
# RUN --mount=target=. \
#     --mount=from=lint-base,src=/usr/bin/golangci-lint,target=/usr/bin/golangci-lint \
#     --mount=type=cache,target=/go/pkg/mod \
#     --mount=type=cache,target=/root/.cache/go-build \
#     --mount=type=cache,target=/root/.cache/golangci-lint \
#     golangci-lint run --timeout 2m0s ./...

# FROM scratch AS unit-test-coverage
# COPY --from=unit-test /out/cover.out /cover.out

FROM golang:1.14.1-buster AS bin
LABEL org.opencontainers.image.source https://github.com/persunde/wdg-projects

RUN mkdir /crawler
WORKDIR /crawler
COPY --from=build /out/wdg-crawler /crawler
RUN mkdir ../database
ENTRYPOINT ["/crawler/wdg-crawler"]