#!/bin/bash
green='\e[0;32m'
red='\e[0;31m'
NC='\e[0m'

log() {
  echo -e ${red}[release]${NC} $1 ${NC}
}

log "Publish plugin? (y/n)"
read CHAR
while [[ $CHAR != 'y' && $CHAR != 'n' ]]
do
  log "${red}Incorrect data, enter y or n"
  log "Publish plugin? (y/n)"
  read CHAR
done
if [ "$CHAR" == "y" ]; then
  IS_PUBLISH_VERSION=true
fi
if [ "$CHAR" == "n" ]; then
  IS_PUBLISH_VERSION=false
fi

log "Chech config files"
IS_VALID_CONFIGS=$(node release/check-config-files.js)

if [[ $IS_VALID_CONFIGS == false ]] ; then
  exit 1
fi
log "${green}Config files is valid"

PROJECT_NAME=$(node release/get-project-name.js)
VERSION=$(node release/get-version.js)

bail() {
  echo $1 >&2
  exit 1
}

usage() {
  bail "usage: $0 <MODULE_NAME> <DIST_DIR>"
}

[ -n "$IS_PUBLISH_VERSION" ] || usage
[ -n "$PROJECT_NAME" ] || usage
[ -n "$VERSION" ] || bail "ERROR: Could not determine version from package.json"
[ -z "`git tag -l v$VERSION`" ] || bail "ERROR: There is already a tag for: v$VERSION"


log $VERSION
log $IS_PUBLISH_VERSION

if [[ $IS_PUBLISH_VERSION == true ]] ; then
  log "Start publish $PROJECT_NAME v$VERSION"

  log "${green}$PROJECT_NAME v$VERSION is a published"
fi
