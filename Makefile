all: login build

export DOCKER_BUILDKIT=1
DB_PATH = $(shell pwd)/database/wdgprojects.db
VERSION=v0.2
RUN_NAME=wdg-projects-crawler

.PHONY: login
login:
	cat ~/.githubtokens/github-container-login-token.txt | docker login https://ghcr.io -u persunde --password-stdin

.PHONY: build
build:
	cd crawler && docker build . --target bin --tag ghcr.io/persunde/wdg-projects/crawler:${VERSION}
	docker tag ghcr.io/persunde/wdg-projects/crawler:${VERSION} ghcr.io/persunde/wdg-projects/crawler:latest
	docker push ghcr.io/persunde/wdg-projects/crawler:${VERSION}
	docker push ghcr.io/persunde/wdg-projects/crawler:latest

.PHONY: run
run:
	docker kill ${RUN_NAME} | true
	docker rm ${RUN_NAME} | true
	docker pull ghcr.io/persunde/wdg-projects/crawler:latest
	docker run -d --name ${RUN_NAME} --mount src=${DB_PATH},target=/database/wdgprojects.db,type=bind ghcr.io/persunde/wdg-projects/crawler:latest
