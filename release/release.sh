#!/bin/bash
green='\e[0;32m'
red='\e[0;31m'
yellow='\e[0;33m'
purple='\e[0;35m'
NC='\e[0m'

log() {
  echo -e ${purple}[release]${NC} $1 ${NC}
}

fail() {
  log "${red}$*"
  exit 1
}

mess() {
  log "${yellow}$1"
}

success() {
  log "${green}$1"
}

log "Check branch"
BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
if [[ $BRANCH != "develop" ]] ; then
  fail "ERROR: Need develop git branch"
fi
log "${green}Branch develop"

IS_PUBLISH_VERSION=true
log "Chech config files"
IS_VALID_CONFIGS=$(node release/check-config-files.js)

if [[ $IS_VALID_CONFIGS == false ]] ; then
  fail "Config files is invalid"
fi
log "${green}Config files is valid"

log "Inc version"
RES=$(node release/inc-version.js)
[[ $RES == true ]] || fail "ERROR 0"
log "${green}Inc version finish"

log "Update project info"
RES=$(node release/update-project-info.js)
[[ $RES == true ]] || fail "ERROR: project info doesn't update"
log "${green}Project info updated"

log "Validate configs"
RES=$(node release/validate-configs.js)
[[ $RES == true ]] || fail "ERROR: Configs is invalid"
log "${green}Configs is valid"

PROJECT_NAME=$(node release/get-project-name.js)
log "Project name: $PROJECT_NAME"

VERSION=$(node release/get-version.js)
log "Project version: $VERSION"


[ -n "$IS_PUBLISH_VERSION" ] || fail "ERROR: IS_PUBLISH_VERSION empty"
[ -n "$PROJECT_NAME" ] || fail "ERROR: PROJECT_NAME empty"
[ -n "$VERSION" ] || fail "ERROR: Could not determine version from package.json"
[ -z "`git tag -l v$VERSION`" ] || fail "ERROR: There is already a tag for: v$VERSION"

log "Create commit: Update version"
git add package.json bower.json
git commit -m "Update version"

log "Build project"
make

log "Checkout git branch: master"
git checkout master

log "Pull --rebase"
git pull --rebase

log "Merge branch:develop"
git merge --no-ff develop -m "Release v$VERSION"

log "Push data"
git push

log "Tag v$VERSION created"
git tag v$VERSION
git ci -m "Publish $PROJECT v$VERSION"

log "Push tag"
git push --tags

if [[ $IS_PUBLISH_VERSION == true ]] ; then
  log "Start publish $PROJECT_NAME v$VERSION"

  log "${green}$PROJECT_NAME v$VERSION is a published"
fi

log "${green}Project is released"
