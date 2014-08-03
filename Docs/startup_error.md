## Error #1
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

## Error #2
Not found packages: node, npm, gulp, phonegap.

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

## Error #3
```
phonegap local run android
->
[Error: Please install Android target N (the Android newest SDK). Make sure you have the latest Android tools installed as well. Run "android" from your command-line to install/update any missing SDKs or tools.]
```

#### Decision
[Install android API N](https://github.com/AlekseyLeshko/phonegap-seed/blob/master/Docs/install_dependencies.md#install-android-api-19)
Or in project.properties(phonagap-seed/platforms/android/) file replace
```
target=android-N
```
the version that you have installed

## Error #4
```
gulp watch

->
Error: watch ENOSPC
  at exports._errnoException (util.js:742:11)
  at FSWatcher.start (fs.js:1062:11)
  at Object.fs.watch (fs.js:1088:11)

```

#### Decision
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
[stackoverflow](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc)
