# VueJS 실행

## 1. 기본 환경 구성
### 1) node 및 npm 설치
- node 설치
~~~
$ brew install node
~~~
- node 및 npm 확인
~~~
$ node -v
$ npm -v   
~~~

### 2) GIT 설치
- git 설치
~~~
$ brew install git
~~~
- git 확인
~~~
$ git --version
~~~

### 3) IDE tool 설치
- tool : Visual Studio Code
- 마켓플레이스 (개인 필요에 따라 추가 등록) :
~~~
Vetur 
Korean Language Pack for Visual Studio Code
git
ESLint
Vue VSCode Snippets
Prettier
~~~
  

## 2. GIT repository Pull
### 1) 프로젝트 폴더 위치
~~~
$ cd workspace
~~~

### 2) source pull
~~~
$ git clone https://github.com/pe-woongjin/frontend-demo.git
~~~


## 3. VueJS 실행
### 1) node modules 설치
~~~
$ cd workspace/frontend-demo
$ npm install
~~~
![screen](manual/images/npm_install.png)

### 2) cache 이상이 있는 경우 실행 (clear)
~~~
$ npm cache verify
~~~ 

### 3) 실행
~~~
$ npm run serve
~~~
![screen](manual/images/npm_run.png)