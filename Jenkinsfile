pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                // Install dependencies
                sh 'npm install'
                
                // Build project
                sh 'npm run build'
            }
        }
    }
}
