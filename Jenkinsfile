import groovy.json.JsonSlurper

def S3_BUCKET_NAME        = "opsflex-cicd-mgmt"
def S3_PATH               = "frontend"

def TARGET_DOMAIN_NAME    = "dev.ui.mingming.shop"
def TARGET_GROUP_PREFIX   = "demo-apne2-dev-ui"
def TARGET_RULE_ARN       = "arn:aws:elasticloadbalancing:ap-northeast-2:144149479695:listener-rule/app/comp-apne2-prod-mgmt-alb/d76ec25af38db29c/d15a5636f3b71341/1e1c03bd4d65fa61"

@NonCPS
def toJson(String text) {
    def parser = new JsonSlurper()
    return parser.parseText( text )
}

def VUE_MODE = ""


def initEnvData(String text) {
    sh "echo initEnvData ${text}"
    if (text == 'develop') {
      env.VUE_MODE = 'build-dev'
    } else if (text == 'release') {
      env.VUE_MODE = 'build-rel'
    } else if (text == 'master') {
      env.VUE_MODE = 'build-prod'
    } else {
      env.VUE_MODE = ""
    }
}

node {
  def mode = ''
  stage('Git clone') {
    sh '''
    rm -rf /var/lib/jenkins/workspace/"${JOB_NAME}"/*
    '''
    git(url: 'https://github.com/pe-woongjin/frontend-demo.git', branch: "${branch}", changelog: true)
  }
  stage ('npm build') {
    sh "echo 111111111"

    initEnvData("${branch}")
    sh "echo env test1"
    sh "echo ${VUE_MODE}"
    
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
