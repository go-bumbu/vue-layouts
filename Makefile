COMMIT_SHA_SHORT ?= $(shell git rev-parse --short=12 HEAD)
PWD_DIR := ${CURDIR}

default: help


#==========================================================================================
##@ Develop
#==========================================================================================

prepare: ## run dev preparation
	@npm install

fmt: ## format code
	@npm run format

lint: ## run eslint
	@npm run lint

run: ## run local dev playground
	@npm run dev

watch: ## run build on every change
	@npm run watch

build: ## build a production release
	@npm run build

dependencies: ## check unused dependencies
	@npx npm-check

update: ## check updates and update packages
	@npm install -g npm-check-updates && \
     ncu -u


#==========================================================================================
##@ Release
#==========================================================================================

.PHONY: check-git-clean
check-git-clean: # check if git repo is clen
	@git diff --quiet

.PHONY: check-branch
check-branch:
	@current_branch=$$(git symbolic-ref --short HEAD) && \
	if [ "$$current_branch" != "main" ]; then \
		echo "Error: You are on branch '$$current_branch'. Please switch to 'main'."; \
		exit 1; \
	fi

.PHONY: check-vers
check-vers: # check for needed envs
	@[ "${version}" ] || ( echo ">> version is not set, usage: make release version=\"v1.2.3\" "; exit 1 )

tag: check-vers check-branch check-git-clean ## create a tag and push to git (version="v1.2.3")
	@git diff --quiet || ( echo 'git is in dirty state' ; exit 1 )
	@[ "${version}" ] || ( echo ">> version is not set, usage: make release version=\"v1.2.3\" "; exit 1 )
	@git tag -d $(version) || true
	@git tag -a $(version) -m "Release version: $(version)"
	@git push --delete origin $(version) || true
	@git push origin $(version) || true

check_gh_token: # check for needed GH token
ifndef GITHUB_TOKEN
	$(error GITHUB_TOKEN is undefined, create one with repo permissions here: https://github.com/settings/tokens/new?scopes=repo,write:packages)
endif

login: check_gh_token ## npm login to Github packages
	@echo "//npm.pkg.github.com/:_authToken=$(GITHUB_TOKEN)" > .npmrc

publish: ## publish the latest tag on GP packages
	@npm publish --registry=https://npm.pkg.github.com


#==========================================================================================
#  Help
#==========================================================================================
.PHONY: help
help: # Display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
