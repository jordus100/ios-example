pipeline {
    agent none
    stages {
        stage('Build app') {
            agent { label 'mac' }
            environment {
                PATH="/Users/smartdust/.rbenv/shims:/usr/bin:/bin:/usr/sbin:/sbin"
            }
            steps {
                checkout scm
                sh 'gem install bundler'
                sh 'bundle install'
                sh 'bundle exec fastlane build'
                stash includes: 'Kalculator.ipa', name: 'BUILT_IPA'
            }
        }
        stage('Connect to iPhones') {
            agent { label 'inbuilt' }
            environment {
                SD_URL = 'https://staging.smartdust.me'
                SD_TOKEN = 'a534c80c572442689dd560c4bc34921ce441781b34434f5bb02b062424a89fee'
            }
            steps {
                sh 'smartdust-client disconnect --all'
                sh 'smartdust-client connect --all -f platform:iOS'
            }
        }
        stage('Install app on iPhones') {
            agent { label 'inbuilt' }
            environment {
                APP_PATH = 'Kalculator.ipa'
            }
            steps {
                unstash 'BUILT_IPA'
                sh 'ideviceinstaller -w -u c81fadec2a2affb46093bb3036cf1f49db2dc187 install $APP_PATH'
                sh 'ideviceinstaller -w -u 25c925bfbb0ed425fa7c4e30d62b6be82fe15298 install $APP_PATH'
            }
        }
        stage('Appium test') {
            agent { label 'inbuilt' }
            environment {
                PATH = '/home/smartdust/.nvm/versions/node/v18.16.1/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
                SD_URL = 'https://staging.smartdust.me'
                SD_TOKEN = 'a534c80c572442689dd560c4bc34921ce441781b34434f5bb02b062424a89fee'
            }
            steps {
                dir('client') {
                    sh 'npm install'
                    sh 'npx appium &'
                    sh 'ios --udid=25c925bfbb0ed425fa7c4e30d62b6be82fe15298 forward 7777 8100&'
                    sh 'ios --udid=c81fadec2a2affb46093bb3036cf1f49db2dc187 forward 7778 8100&'
                    sh 'sleep 10'
                    sh 'node test.js'
                }
                sh 'smartdust-client disconnect --all'
            }
        }
    }

}
