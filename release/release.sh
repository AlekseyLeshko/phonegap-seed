#!/bin/bash
green='\e[0;32m'
red='\e[0;31m'
NC='\e[0m'

log() {
  echo -e ${red}[release]${NC} $1 ${NC}
}

bail() {
  log "${red}$*"
  exit 1
}

log "Check branch"
BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
if [[ $BRANCH != "develop" ]] ; then
  bail "ERROR: Need develop git branch"
fi
log "${green}Branch develop"

IS_PUBLISH_VERSION=true
log "Chech config files"
IS_VALID_CONFIGS=$(node release/check-config-files.js)

if [[ $IS_VALID_CONFIGS == false ]] ; then
  bail "Config files is invalid"
fi
log "${green}Config files is valid"

log "Inc version"
RES=$(node release/inc-version.js)
[[ $RES == true ]] || bail "ERROR 0"
log "${green}Inc version finish"

log "Update project info"
RES=$(node release/update-project-info.js)
[[ $RES == true ]] || bail "ERROR: project info doesn't update"
log "${green}Project info updated"

log "Validate configs"
RES=$(node release/validate-configs.js)
[[ $RES == true ]] || bail "ERROR: Configs is invalid"
log "${green}Configs is valid"

PROJECT_NAME=$(node release/get-project-name.js)
log "Project name: $PROJECT_NAME"

VERSION=$(node release/get-version.js)
log "Project version: $VERSION"


[ -n "$IS_PUBLISH_VERSION" ] || bail "ERROR: IS_PUBLISH_VERSION empty"
[ -n "$PROJECT_NAME" ] || bail "ERROR: PROJECT_NAME empty"
[ -n "$VERSION" ] || bail "ERROR: Could not determine version from package.json"
[ -z "`git tag -l v$VERSION`" ] || bail "ERROR: There is already a tag for: v$VERSION"

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
