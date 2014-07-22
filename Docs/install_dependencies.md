Install dependencies
====================

For work with PhoneGap seed project need install this dependency list
1. All for Nodejs
  1. [nvm](#install-nvm)
  1. [node](#install-node)
  2. [npm](#install-npm)
  3. [gulp](#install-gulp)
  4. [install gulp plugin for project](#install-gulp-plugin)
2. Dependencies with gulp plugin
  1. gulp-slim plugin
    1. [rvm](#install-rvm)
    2. [ruby](#install-ruby)
    3. [slim gem](#install-slim-gem)
3. phonegap framework
  1. [java](#install-java)
  2. [ant](#install-ant)
  3. [android sdk](#install-android-sdk)
    1. [install android API 19](#install-android-api-19)
    2. [configure emulator](#configure-emulator)

## All shell command for Ubuntu

#### Install nvm
[nvm repo](https://github.com/creationix/nvm)
```
sudo apt-get update
sudo apt-get install build-essential libssl-dev
curl https://raw.githubusercontent.com/creationix/nvm/v0.7.0/install.sh | sh
source ~/.profile
echo "source ~/.nvm/nvm.sh" >> ~/.bashrc
nvm -v
```

#### Install node
[node repo](https://github.com/joyent/node)
```
nvm ls-remote
nvm install 0.10.29
node -v
nvm alias default 0.10.29
nvm use default
```

#### Install npm
[npm](https://www.npmjs.org/)
```
npm install -g express
npm -v
```

#### Install gulp
[gulp](http://gulpjs.com/)
```
npm install -g gulp
```

#### Install gulp plugin
Navigate in project directory
```
cd phonegap-seed/
npm install
```

#### Install dependencies specially for gulp-slim plugin

#### Install rvm
[rvm](https://rvm.io/)

```
sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
curl -L https://get.rvm.io | bash -s stable
source ~/.rvm/scripts/rvm
echo "source ~/.rvm/scripts/rvm" >> ~/.bashrc
```

#### Install ruby
```
rvm install 2.1.2
rvm use 2.1.2 --default
ruby -v
```

#### Install slim gem
```
gem install slim
```

#### Install java

#### Install ant

#### Install android sdk

#### Install android API 19

#### Configure emulator
