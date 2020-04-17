node {
  stage('Git clone') {
    git(url: 'https://github.com/pe-woongjin/frontend-demo.git', branch: "${branch}", changelog: true)
  }
  stage ('directory copy') {
    dir ("/home/$USER/${JOB_NAME}") {
      sh '''
      echo dir test1
      '''
    }
    sh '''
    echo dir test2
    '''
  }
}
parameters {
  choice(name: 'branch', choices: ['develop', 'release', 'master'], description: '브랜치를 선택하세요.')
}
