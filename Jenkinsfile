import groovy.json.JsonSlurper

def S3_BUCKET_NAME        = "opsflex-cicd-mgmt"
def S3_PATH               = "frontend"

def TARGET_DOMAIN_NAME    = ""
def TARGET_GROUP_PREFIX   = ""
def TARGET_RULE_ARN       = ""

def NPM_MODE = ""

@NonCPS
def toJson(String text) {
    def parser = new JsonSlurper()
    return parser.parseText( text )
}

def initEnvironment(String text) {
    if (text == 'develop') {
        env.NPM_MODE = 'build-dev'
        env.TARGET_DOMAIN_NAME    = "dev.ui.mingming.shop"
        env.TARGET_GROUP_PREFIX   = "demo-apne2-dev-ui"
        env.TARGET_RULE_ARN       = "arn:aws:elasticloadbalancing:ap-northeast-2:144149479695:listener-rule/app/comp-apne2-prod-mgmt-alb/d76ec25af38db29c/d15a5636f3b71341/1e1c03bd4d65fa61"
    } else if (text == 'release') {
        env.NPM_MODE = 'build-rel'
        env.TARGET_DOMAIN_NAME    = "dev.ui.mingming.shop"
        env.TARGET_GROUP_PREFIX   = "demo-apne2-stg-ui"
        env.TARGET_RULE_ARN       = "arn:aws:elasticloadbalancing:ap-northeast-2:144149479695:listener-rule/app/comp-apne2-prod-mgmt-alb/d76ec25af38db29c/d15a5636f3b71341/1e1c03bd4d65fa61"
    } else if (text == 'master') {
        env.NPM_MODE = 'build-prod'
        env.TARGET_DOMAIN_NAME    = "dev.ui.mingming.shop"
        env.TARGET_GROUP_PREFIX   = "demo-apne2-prod-ui"
        env.TARGET_RULE_ARN       = "arn:aws:elasticloadbalancing:ap-northeast-2:144149479695:listener-rule/app/comp-apne2-prod-mgmt-alb/d76ec25af38db29c/d15a5636f3b71341/1e1c03bd4d65fa61"
    } else {
        env.NPM_MODE = ""
        error "env parameter error!!!!"
    }
}

def showVariables() {
  echo """
>   NPM_MODE:               ${env.NPM_MODE}
    TARGET_DOMAIN_NAME:     ${env.TARGET_DOMAIN_NAME}
    TARGET_GROUP_PREFIX:    ${env.TARGET_GROUP_PREFIX}
    TARGET_RULE_ARN:        ${env.TARGET_RULE_ARN}
    CURR_ASG_NAME:          ${env.CURR_ASG_NAME}
    NEXT_ASG_NAME:          ${env.NEXT_ASG_NAME}
    DEPLOY_GROUP_NAME:      ${env.DEPLOY_GROUP_NAME}
    ALB_ARN:                ${env.ALB_ARN}
    NEXT_TG_ARN:            ${env.NEXT_TG_ARN}
    NEXT_TARGET_GROUP:      ${env.NEXT_TARGET_GROUP}
    """
}

def initVariables(def tgList) {
    tgList.each { tg ->
        String lbARN  = tg.LoadBalancerArns[0]
        String tgName = tg.TargetGroupName
        String tgARN  = tg.TargetGroupArn

        if(lbARN != null && lbARN.startsWith("arn:aws")) {
            env.ALB_ARN = lbARN
            if(tgName.startsWith("demo-apne2-dev-ui-a")) {
                env.DEPLOY_GROUP_NAME = "demo-ui-group-b"
                env.CURR_ASG_NAME     = env.TARGET_GROUP_PREFIX + "-a-asg"
                env.NEXT_ASG_NAME     = env.TARGET_GROUP_PREFIX + "-b-asg"
            } else {
                env.DEPLOY_GROUP_NAME = "demo-ui-group-a"
                env.CURR_ASG_NAME     = env.TARGET_GROUP_PREFIX + "-b-asg"
                env.NEXT_ASG_NAME     = env.TARGET_GROUP_PREFIX + "-a-asg"
            }
        } else {
            env.NEXT_TG_ARN       = tgARN
            env.NEXT_TARGET_GROUP = tgName
        }
    }
}

node {
    stage('Pre-Process') {
        script {
            echo "----- [Pre-Process] showVariables -----"
            showVariables()


            echo "----- [Pre-Process] init Environment -----"
            initEnvironment("${branch}")

            echo "----- [Pre-Process] Discovery Active Target Group -----"
            sh"""
            aws elbv2 describe-target-groups \
            --query 'TargetGroups[?starts_with(TargetGroupName,`${TARGET_GROUP_PREFIX}`)==`true`]' \
            --region ap-northeast-2 --output json > TARGET_GROUP_LIST.json
            cat ./TARGET_GROUP_LIST.json
            """

            def textValue = readFile("TARGET_GROUP_LIST.json")
            def tgList = toJson(textValue)
            echo "----- [Pre-Process] Initialize Variables -----"
            initVariables(tgList)

            echo "----- [Pre-Process] showVariables -----"
            showVariables()
        }
    }
    stage('Git clone') {
        sh '''
        rm -rf /var/lib/jenkins/workspace/"${JOB_NAME}"/*
        '''
        git(url: 'https://github.com/pe-woongjin/frontend-demo.git', branch: "${branch}", changelog: true)
    }
    stage ('npm build') {
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
          sh "npm run ${env.NPM_MODE}"
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
