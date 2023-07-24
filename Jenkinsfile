pipeline {
    agent none
    stages {
        stage('Build') {
            agent { label 'mac' }
            environment {
                //PATH="/Users/smartdust/.rbenv/shims:/usr/bin:/bin:/usr/sbin:/sbin"
                PATH= '/Users/smartdust/.rbenv/shims:${env.PATH}'
            }
            steps {
                sh 'echo $PATH'
                checkout scm
                sh 'gem install bundler'
                sh 'bundle install'
                sh 'bundle exec fastlane build'
            }
        }
        stage('Connect to iPhones') {
            agent { label 'inbuilt' }
            environment {
                SD_URL = 'https://staging.smartdust.me'
                SD_TOKEN = 'a534c80c572442689dd560c4bc34921ce441781b34434f5bb02b062424a89fee'
            }
            steps {
                sh 'echo '
                sh 'smartdust-client connect --all -f platform:iOS'
            }
        }
        stage('Install app on iPhones') {
            agent { label 'inbuilt' }
            environment {
                APP_PATH = 'Kalculator.ipa'
            }
            steps {
                sh 'ideviceinstaller -u c81fadec2a2affb46093bb3036cf1f49db2dc187 install Kalculator.ipa'
                sh 'ideviceinstaller -u 25c925bfbb0ed425fa7c4e30d62b6be82fe15298 install Kalculator.ipa'
            }
        }
        stage('Appium test') {
            agent { label 'inbuilt' }
            environment {
                NVM_DIR = '/home/smartdust/.nvm'
            }
            steps {
                sh '[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"'
                sh 'nvm use 18.16.1'
                sh 'ios'
            }
        }
    }

}
