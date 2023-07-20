pipeline {
    agent none
    stages {
        stage('Build') {
            agent { label 'mac' }
            environment {
                PATH = '/Users/smartdust/.rbenv/shims:/Users/smartdust/.rbenv/shims:/Users/smartdust/.rbenv1/bin:/Users/smartdust/.nvm/versions/node/v14.20.1/bin:/Users/smartdust/.rbenv/shims:/usr/local/opt/openjdk/bin:/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/bin:/usr/local/sbin:/Library/Apple/usr/bin'
                RBENV = '~/.rbenv1/bin/rbenv'
            }
            steps {
                checkout scm
                sh 'rm -rf ~/.rbenv1'
                sh 'git clone https://github.com/rbenv/rbenv.git ~/.rbenv1'
                sh 'eval "$(~/.rbenv1/bin/rbenv init - sh)"'
                sh 'eval "${RBENV} local 3.2.2"'
                // sh 'eval "$(rbenv init -)"'
                sh 'echo $PATH'
                sh 'ruby -v'
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
    }

}
