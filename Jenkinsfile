pipeline {
    agent any

    environment {
        ENV_FILE = credentials('user-service-id')
        DOCKER_IMAGE = "user-service"
        // DOCKER_REGISTRY_CREDENTIALS = 'docker-credentials-id'  // Jenkins credentials ID for Docker registry
        // KUBERNETES_NAMESPACE = "default"                       // Namespace in Kubernetes
        // KUBERNETES_DEPLOYMENT_NAME = "your-deployment-name"    // Name of the deployment in Kubernetes
        PORT = 3001
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }

        stage('Docker Run Container') {
            steps {
                script {
                    sh '''
                        docker stop ${DOCKER_IMAGE} || true
                        docker rm ${DOCKER_IMAGE} || true
                    '''

                echo 'Starting Docker container...'
                
                sh 'docker run -d --env-file=$ENV_FILE --name ${DOCKER_IMAGE} ${DOCKER_IMAGE}:latest'
                }
            }
        }
    }

    post {
        success {
            echo 'Build, push, and deployment to Kubernetes were successful!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}