pipeline {
  agent any

  environment {
    NODE_ENV = 'test'
    DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/forkity?schema=public'
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
        dir('backend') {
          sh 'npm ci'
        }
      }
    }

    stage('Validate backend') {
      steps {
        dir('backend') {
          sh 'npm run check'
          sh 'npm run prisma:validate'
        }
      }
    }

    stage('Validate Compose') {
      steps {
        sh 'docker compose config --quiet'
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
