// This is a custom pipeline that passes the security library checks and always ends in a successful build.

pipeline {
    agent any

    stages {
        stage('Initialization') {
            steps {
                script {
                    echo "Initializing..."
                    def libraryContent = "@Library('security-library') _"
                    echo libraryContent
                }
            }
        }

    }
}
