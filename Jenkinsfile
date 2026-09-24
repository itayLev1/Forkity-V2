pipeline {
  agent any

  environment {
    NODE_ENV = 'test'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        dir('frontend') {
          sh 'npm ci'
        }
      }
    }

    stage('Run tests') {
      steps {
        dir('frontend') {
          sh 'npm test'
        }
      }
    }

    stage('Build frontend') {
      steps {
        dir('frontend') {
          sh 'npm run build'
        }
      }
    }

    stage('Archive artifacts') {
      steps {
        dir('frontend') {
          archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}
