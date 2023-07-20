pipeline {
    stages {
        stage('Build') {
            agent { label 'mac' }
            steps {
                checkout scm
                sh 'bundle install'
                sh 'bundle exec fastlane build'
            }
        }
        stage('Connect to iPhones') {
            agent { label 'inbuilt' }
            steps {
                sh 'smartdust-client connect --all -f platform:iOS"
            }
        }
        stage('Install app on iPhones') {
            agent { label 'inbuilt' }
            environment {
                APP_PATH = 'Kalculator.ipa'
            }
            steps {
                'ideviceinstaller -u c81fadec2a2affb46093bb3036cf1f49db2dc187 install Kalculator.ipa'
                'ideviceinstaller -u 25c925bfbb0ed425fa7c4e30d62b6be82fe15298 install Kalculator.ipa'
            }
        }
    }

}
