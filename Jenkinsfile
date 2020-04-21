node {
  def mode = ''
  stage ('S3 Upload') {
    sh "echo s3 Upload start ${BUILD_NUMBER}"

    sh "echo s3 Upload end"
  }
}
parameters {
  string(name: 'branch', defaultValue: 'develop', description: '디플로이할 대상 브랜치를 입력하세요.')
}
