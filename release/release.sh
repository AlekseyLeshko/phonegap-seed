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
  log "${red}ERROR: $*"
  exit 1
}

mess() {
  log "${yellow}$1"
}

success() {
  log "${green}success$1"
}

task() {
  mess "$1"
  VALUE=$2
  if [[ $VALUE != $3 ]] ; then
    fail $4
  fi
  success $5
}

task "Check branch" $(git branch | sed -n -e 's/^\* \(.*\)/\1/p') "develop"

task "Chech config files" $(node release/check-config-files.js) true

task "Increment version" $(node release/inc-version.js) true

task "Update project info" $(node release/update-project-info.js) true

task "Validate configs" $(node release/validate-configs.js) true

IS_PUBLISH_VERSION=true
PROJECT_NAME=$(node release/get-project-name.js)
VERSION=$(node release/get-version.js)
log "Project name: ${green}$PROJECT_NAME"
log "Project version: ${green}$VERSION"

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
