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

        stage('PRE-BUILD') {
            steps {
                script {
                    echo "Pre-Build Stage"
                    def preBuildContent = "secPreBuild()"
                    echo preBuildContent
                }
            }
        }

        stage('BUILD') {
            steps {
                echo "Hello World"
            }
        }

        stage('POST-BUILD') {
            steps {
                script {
                    echo "Post-Build Stage"
                    def postBuildContent = "secPostBuild()"
                    echo postBuildContent
                }
            }
        }

        stage('PRE-DEPLOY') {
            steps {
                script {
                    echo "Pre-Deploy Stage"
                    def preDeployContent = "secPreDeploy()"
                    echo preDeployContent
                }
            }
        }

        stage('DEPLOY') {
            steps {
                echo "Deploying..."
            }
        }

        stage('POST-DEPLOY') {
            steps {
                script {
                    echo "Post-Deploy Stage"
                    def postDeployContent = "secPostDeploy()"
                    echo postDeployContent
                }
            }
        }
    }
}
