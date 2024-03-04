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
            }
        }
        
        stage('Deploy') {
            steps {
                // Remove previous build
                sh 'rm -rf /home/vagrant/Todo_App_Server/build/'

                // Move new build to target directory
                sh 'mv build /home/vagrant/Todo_App_Server/'

                // Stop the previous server.js
                sh 'pm2 stop all'
                
                // Start server
                sh 'pm2 start /home/vagrant/Todo_App_Server/server.js'
            }
        }
    }
}
