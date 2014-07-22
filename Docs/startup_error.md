## Error
```
nvm --version
->0.11.0
nvm ls
->sbin
mkdir: cannot create directory ‘/usr/sbin/alias’: Permission denied
```

#### Decision
Add
```
export NVM_DIR=~/.nvm
```
In .bashrc file and reboot terminal

## Error
Not found packages: node, npm, gulp.

#### Decision
[Install nvm](https://github.com/AlekseyLeshko/phonegap-seed/blob/master/Docs/install_dependencies.md#install-nvm), [install node version](https://github.com/AlekseyLeshko/phonegap-seed/blob/master/Docs/install_dependencies.md#install-node)
```
nvm use <version> example nvm use 0.10.29
or
nvm use <alias> example nvm use default
```
Check whether the installed packages
```
node -v
npm -v
gulp -v
```
If not found, [install them](https://github.com/AlekseyLeshko/phonegap-seed/blob/master/Docs/install_dependencies.md)
