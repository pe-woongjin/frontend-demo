node {
  def mode = ''
  stage ('S3 Upload') {
    sh "echo s3 Upload start"
    dir ("/var/lib/jenkins/workspace/build/${JOB_NAME}/dist") {
      sh "ls -al"
      s3Upload(file:'index.html', bucket:'ksu-s3-mgmt', path:'path/to/frontend/')
    }
    sh "echo s3 Upload end"
    // s3Upload(file:"${it}", bucket:'rpm-repo', path:"${bucket_path}")
  }
}
parameters {
  string(name: 'branch', defaultValue: 'develop', description: '디플로이할 대상 브랜치를 입력하세요.')
}
