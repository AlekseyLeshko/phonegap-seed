phonegap-seed
=============

## Install dependencies
#### Install [nvm](https://github.com/creationix/nvm)
For Ubuntu
```
sudo apt-get update
sudo apt-get install build-essential libssl-dev
curl https://raw.githubusercontent.com/creationix/nvm/v0.7.0/install.sh | sh
source ~/.profile
echo "source ~/.nvm/nvm.sh" >> ~/.bashrc
nvm -v
```

#### Install node
```
nvm ls-remote
nvm install 0.10.29
node -v
nvm alias default 0.10.29
nvm use default
```

#### Install npm
```
npm install -g express
npm -v
```

#### Install gulp
```
npm install -g gulp
```

#### Install gulp plugin
```
npm install
```

#### Install dependencies specially for gulp-slim plugin
Install gem(yeees, install ruby, install gemset and install current gem) and use him

Install rvm
```
sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
curl -L https://get.rvm.io | bash -s stable
source ~/.rvm/scripts/rvm
echo "source ~/.rvm/scripts/rvm" >> ~/.bashrc
rvm install 2.1.2
rvm use 2.1.2 --default
ruby -v
```

Install gem
```
gem install slim
```

## Build project
```
gulp build
```

#### Run web server
```
gulp connect
```
and go to [link](http://localhost:8080/)
