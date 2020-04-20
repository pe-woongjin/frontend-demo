node {
  stage('Git clone') {
    git(url: 'https://github.com/pe-woongjin/frontend-demo.git', branch: "${branch}", changelog: true)
  }
  stage ('directory copy') {
    sh '''
    mkdir -p ~/workspace/build
    cp -r /var/lib/jenkins/workspace/"${JOB_NAME}" ~/build/"${JOB_NAME}"
    cd ~/build/"${JOB_NAME}"
    npm install
    npm run build-dev
    echo dir test
    '''
  }
}
parameters {
  choice(name: 'branch', choices: ['develop', 'release', 'master'], description: '브랜치를 선택하세요.')
}
