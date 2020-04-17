node {
  stage('Git clone') {
    git(url: 'https://github.com/pe-woongjin/frontend-demo.git', branch: "${branch}", changelog: true)
  }
  stage ('directory copy') {
    sh '''
    mkdir -p /home/$USER/"${JOB_NAME}"
    cp -r /var/lib/jenkins/workspace/"${JOB_NAME}" /home/$USER/"${JOB_NAME}"
    echo dir test1
    '''
    sh '''
    echo dir test2
    '''
  }
}
parameters {
  choice(name: 'branch', choices: ['develop', 'release', 'master'], description: '브랜치를 선택하세요.')
}
