pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                // Install dependencies
                sh 'npm install'
                
                // Build project
                sh 'npm run build'

                sh 'ls -l'

                sh 'pm2 stop all'
            }
        }
    }
}
