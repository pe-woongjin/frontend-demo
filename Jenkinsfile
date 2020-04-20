node {
  stage('Git clone') {
    git(url: 'https://github.com/pe-woongjin/frontend-demo.git', branch: "${branch}", changelog: true)
  }
  stage ('directory copy') {
    sh '''
    mkdir -p /home/jenkins
    cp -r /var/lib/jenkins/workspace/"${JOB_NAME}" ~/"${JOB_NAME}"
    echo dir test
    '''
  }
}
parameters {
  choice(name: 'branch', choices: ['develop', 'release', 'master'], description: '브랜치를 선택하세요.')
}
