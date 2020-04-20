def mode = ""
node {
  stage('Git clone') {
    sh '''
    rm -rf /var/lib/jenkins/workspace/"${JOB_NAME}"/*
    '''
    git(url: 'https://github.com/pe-woongjin/frontend-demo.git', branch: "${branch}", changelog: true)
  }
  stage ('Npm Build') {
    // env parameter
    if ("${branch}" == 'develop') {
      mode = 'build-dev'
    } else if ("${branch}" == 'release') {
      mode = 'build-rel'
    } else if ("${branch}" == 'master') {
      mode = 'build-prod'
    } else {
      error "env parameter error!!!!"
    }
    sh "echo mode = ${mode}"
    
    // directory check
    sh '''
    mkdir -p /var/lib/jenkins/workspace/build
    rm -rf /var/lib/jenkins/workspace/build/*
    cp -r /var/lib/jenkins/workspace/"${JOB_NAME}" /var/lib/jenkins/workspace/build/"${JOB_NAME}"
    cd /var/lib/jenkins/workspace/build/"${JOB_NAME}"
    npm install
    npm run ${mode}
    echo npm build success
    '''
  }
  stage ('S3 Upload') {
    sh "echo s3 Upload start"
  }
}
parameters {
  string(name: 'branch', defaultValue: 'develop', description: '디플로이할 대상 브랜치를 입력하세요.')
}
