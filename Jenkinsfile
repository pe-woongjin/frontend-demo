def mode = ""
node {
  stage('Git clone') {
    git(url: 'https://github.com/pe-woongjin/frontend-demo.git', branch: "${branch}", changelog: true)
  }
  stage ('directory copy') {
    if ("${branch}" == 'develop') {
      mode = 'build-dev'
    } else if ("${branch}" == 'release') {
      mode = 'build-rel'
    } else {
      mode = 'build-prod'
    }
    sh 'echo mode = "${mode}"'
    
    sh '''
    mkdir -p /var/lib/jenkins/workspace/build
    rm -rf /var/lib/jenkins/workspace/build/*
    cp -r /var/lib/jenkins/workspace/"${JOB_NAME}" /var/lib/jenkins/workspace/build/"${JOB_NAME}"
    cd /var/lib/jenkins/workspace/build/"${JOB_NAME}"
    npm install
    npm run build-dev
    echo dir test
    '''
  }
}
parameters {
  choice(name: 'branch', choices: ['develop', 'release', 'master'], description: '브랜치를 선택하세요.')
}
