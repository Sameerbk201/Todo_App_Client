pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                // Install dependencies
                sh 'npm install'

                // Build project
                sh 'npm run build'

                // Check if build artifacts exist
                sh 'ls -l build'
            }
        }

        stage('Deploy') {
            steps {
                // Remove previous build
                sh 'rm -rf /home/vagrant/Todo_App_Server/build/'

                // Move new build to target directory
                sh 'mv build /home/vagrant/Todo_App_Server/'

                // Confirm build artifacts are deployed
                sh 'ls -l /home/vagrant/Todo_App_Server/build'

                // Stop the previous server.js
                script {
                    try {
                        sh 'pm2 stop all'
                    } catch (err) {
                        echo 'No processes running, skipping stop command'
                    }
                }

                // Start server
                sh '/home/vagrant/Todo_App_Server/server.sh'
                //sh 'pm2 start /home/vagrant/Todo_App_Server/server.js'
            }
        }
    }
}
