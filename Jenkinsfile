node {
  def mode = ''
  stage('Git clone') {
    sh '''
    rm -rf /var/lib/jenkins/workspace/"${JOB_NAME}"/*
    '''
    git(url: 'https://github.com/pe-woongjin/frontend-demo.git', branch: "${branch}", changelog: true)
  }
  stage ('npm build') {
    // env parameter setting
    if ("${branch}" == 'develop') {
      mode = 'build-dev'
    } else if ("${branch}" == 'release') {
      mode = 'build-rel'
    } else if ("${branch}" == 'master') {
      mode = 'build-prod'
    } else {
      error "env parameter error!!!!"
    }
    // sh "echo mode = ${mode}"
    
    // directory check
    sh '''
    echo mode1 = ${mode}
    mkdir -p /var/lib/jenkins/workspace/build
    rm -rf /var/lib/jenkins/workspace/build/"${JOB_NAME}"/*
    cp -rf /var/lib/jenkins/workspace/"${JOB_NAME}" /var/lib/jenkins/workspace/build
    cd /var/lib/jenkins/workspace/build/"${JOB_NAME}"
    npm install
    echo npm install success
    '''
    // npm build
    dir ("/var/lib/jenkins/workspace/build/${JOB_NAME}") {
      sh "npm run ${mode}"
    }
    
  }
  stage ('S3 Upload') {
    sh "echo s3 Upload start"
    dir ("/var/lib/jenkins/workspace/build/${JOB_NAME}") {
      withAWS(region:'ap-northeast-2') {
        sh "echo build number : ${BUILD_NUMBER}"
        s3Upload(file:'dist', bucket:'ksu-s3-mgmt', path:"frontend/${BUILD_NUMBER}")
      }      
    }
    sh "echo s3 Upload end"
  }
}
parameters {
  string(name: 'branch', defaultValue: 'develop', description: '디플로이할 대상 브랜치를 입력하세요.')
}
