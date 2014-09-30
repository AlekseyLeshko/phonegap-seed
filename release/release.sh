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
  mess "${red}ERROR: $*"
  exit 1
}

mess() {
  log "${yellow}$1"
}

success() {
  mess "${green}success$1"
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
mess "Project name: ${green}$PROJECT_NAME"
mess "Project version: ${green}$VERSION"

[ -n "$IS_PUBLISH_VERSION" ] || fail "ERROR: IS_PUBLISH_VERSION empty"
[ -n "$PROJECT_NAME" ] || fail "ERROR: PROJECT_NAME empty"
[ -n "$VERSION" ] || fail "ERROR: Could not determine version from package.json"
[ -z "`git tag -l v$VERSION`" ] || fail "ERROR: There is already a tag for: v$VERSION"

mess "Create commit: Update version"
git add package.json bower.json config/app.json
git commit -m "Update version"

mess "Build project"
make

mess "Checkout git branch: master"
git checkout master

mess "Pull --rebase"
git pull --rebase

mess "Merge branch:develop"
git merge --no-ff develop -m "Release v$VERSION"

mess "Push data"
git push

mess "Tag v$VERSION created"
git tag v$VERSION
git ci -m "Publish $PROJECT v$VERSION"

mess "Push tag"
git push --tags

if [[ $IS_PUBLISH_VERSION == true ]] ; then
  mess "Start publish $PROJECT_NAME v$VERSION"

  success "$PROJECT_NAME v$VERSION is a published"
fi

success "Project is released"
