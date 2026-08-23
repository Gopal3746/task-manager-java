pipeline {
    agent any

    stages {
        stage('Backend Test') {
            steps {
                dir('backend') {
                    sh 'mvn -B test'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Compose Check') {
            steps {
                sh 'docker compose config'
            }
        }
    }

    post {
        success {
            echo 'Task Tracker pipeline passed.'
        }
        failure {
            echo 'Task Tracker pipeline failed. Check the stage logs.'
        }
    }
}
