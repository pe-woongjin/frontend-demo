def S3_BUCKET_NAME      = "opsflex-cicd-mgmt"
def S3_PATH             = "frontend"

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
    
    // directory check
    sh '''
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
    // codedeploy setting
    sh "cp -rf /var/lib/jenkins/workspace/build/${JOB_NAME}/scripts /var/lib/jenkins/workspace/build/${JOB_NAME}/dist"
    sh "cp -rf /var/lib/jenkins/workspace/build/${JOB_NAME}/appspec.yml /var/lib/jenkins/workspace/build/${JOB_NAME}/dist" 
    
  }
  stage ('S3 Upload') {
    dir ("/var/lib/jenkins/workspace/build/${JOB_NAME}/dist") {
      sh "jar cvf frontend.zip *"
      sh "ls"
      withAWS(region:'ap-northeast-2') {
        s3Upload(file:'frontend.zip', bucket:"${S3_BUCKET_NAME}", path:"${S3_PATH}/${JOB_NAME}/${BUILD_NUMBER}/frontend.zip")
      }      
    }
  }
  stage ('deploy') {
    dir ("/var/lib/jenkins/workspace/build/${JOB_NAME}/dist") {
      sh "aws --version"
      sh '''
      aws deploy create-deployment \
      --application-name "demo-apne2-ui-codedeploy" \
      --s3-location bucket="demo-apne2-cicd-mgmt",key=frontend/${JOB_NAME}/${BUILD_NUMBER}/frontend.zip,bundleType=zip \
      --deployment-group-name "demo-ui-group-a" \
      --description "create frontend" \
      --region ap-northeast-2
      '''
    }
  }
}
parameters {
  string(name: 'branch', defaultValue: 'develop', description: '디플로이할 대상 브랜치를 입력하세요.')
}
