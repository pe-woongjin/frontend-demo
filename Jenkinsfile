def mode = ""
node {
  stage('Git clone') {
    git(url: 'https://github.com/pe-woongjin/frontend-demo.git', branch: "${branch}", changelog: true)
  }
  stage ('directory copy') {
    # 
    if ("${branch}" == 'develop') {
      sh 'echo dev'
    } else if ("${branch}" == 'release') {
      sh 'echo rel'
    } else {
      sh 'echo master'
    }
    sh '''
    rm 
    mkdir -p ~/workspace/build
    cp -r /var/lib/jenkins/workspace/"${JOB_NAME}" /var/lib/jenkins/workspace/build/"${JOB_NAME}"
    cd ~/workspace/build/"${JOB_NAME}"
    npm install
    npm run build-dev
    echo dir test
    '''
  }
}
parameters {
  choice(name: 'branch', choices: ['develop', 'release', 'master'], description: '브랜치를 선택하세요.')
}
