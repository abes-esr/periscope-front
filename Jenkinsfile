//this is the scripted method with groovy engine
import hudson.model.Result

node {

    //Configuration
    def gitURL = "https://github.com/abes-esr/periscope-front.git"
    def gitCredentials = ''
    def jsDir = "dist/"
    def htmlBaseDir = "/var/www/html/periscope/"
    def slackChannel = "#notif-periscope"

    // Variables globales
    def ENV
    def serverHostnames = []

    // Configuration du job Jenkins
    // On garde les 5 derniers builds par branche
    // On scanne les branches et les tags du Git
    properties([
            buildDiscarder(
                    logRotator(
                            artifactDaysToKeepStr: '',
                            artifactNumToKeepStr: '',
                            daysToKeepStr: '',
                            numToKeepStr: '5')
            ),
            parameters([
                    gitParameter(
                            branch: '',
                            branchFilter: 'origin/(.*)',
                            defaultValue: 'develop',
                            description: 'Sélectionner la branche ou le tag à déployer',
                            name: 'BRANCH_TAG',
                            quickFilterEnabled: false,
                            selectedValue: 'NONE',
                            sortMode: 'DESCENDING_SMART',
                            tagFilter: '*',
                            type: 'PT_BRANCH_TAG'),
                    choice(choices: ['DEV', 'TEST', 'PROD'], description: 'Sélectionner l\'environnement cible', name: 'ENV'),
            ])
    ])

    stage('Set environnement variables') {
        try {
            env.NODEJS_HOME = "${tool 'NodeJS 11.2.0'}"
            env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
            sh 'npm --version'

            if (params.BRANCH_TAG == null) {
                throw new Exception("Variable BRANCH_TAG is null")
            } else {
                echo "Branch to deploy =  ${params.BRANCH_TAG}"
            }

            if (params.ENV == null) {
                throw new Exception("Variable ENV is null")
            } else {
                ENV = params.ENV
                echo "Target environnement =  ${ENV}"
            }

            if (ENV == 'DEV') {
                serverHostnames.add('hostname.server-front-1-dev')
                serverHostnames.add('hostname.server-front-2-dev')

            } else if (ENV == 'TEST') {
                serverHostnames.add('hostname.server-front-1-test')
                serverHostnames.add('hostname.server-front-2-test')

            } else if (ENV == 'PROD') {
                serverHostnames.add('hostname.server-front-1-prod')
                serverHostnames.add('hostname.server-front-2-prod')
            }

        } catch (e) {
            currentBuild.result = hudson.model.Result.NOT_BUILT.toString()
            notifySlack(slackChannel,e.getLocalizedMessage())
            throw e
        }
    }

    stage('SCM checkout') {
        try {
            checkout([
                    $class                           : 'GitSCM',
                    branches                         : [[name: "${params.BRANCH_TAG}"]],
                    doGenerateSubmoduleConfigurations: false,
                    extensions                       : [],
                    submoduleCfg                     : [],
                    userRemoteConfigs                : [[credentialsId: "${gitCredentials}", url: "${gitURL}"]]
            ])

        } catch (e) {
            currentBuild.result = hudson.model.Result.FAILURE.toString()
            notifySlack(slackChannel,e.getLocalizedMessage())
            throw e
        }
    }

    stage('Information') {
        try {
            sh 'node -v'
            sh 'npm -v'

        } catch (e) {
           currentBuild.result = hudson.model.Result.FAILURE.toString()
           notifySlack(slackChannel,e.getLocalizedMessage())
           throw e
        }
    }

    stage("Edit .env file...") {
          try {
            echo "Edit .env file..."

            original = readFile ".env"
            newconfig = original

            if (ENV == 'DEV') {
                withCredentials([
                  string(credentialsId: "url-api-periscope-dev", variable: 'url')
                ]) {
                    newconfig = newconfig.replaceAll("VUE_APP_ROOT_API=*", "VUE_APP_ROOT_API=${url}")
                }

            } else if (ENV == 'TEST') {
                withCredentials([
                  string(credentialsId: "url-api-periscope-test", variable: 'url')
                ]) {
                    newconfig = newconfig.replaceAll("VUE_APP_ROOT_API=*", "VUE_APP_ROOT_API=${url}")
                }

            } else if (ENV == 'PROD') {
                withCredentials([
                  string(credentialsId: "url-api-periscope-prod", variable: 'url')
                ]) {
                    newconfig = newconfig.replaceAll("VUE_APP_ROOT_API=*", "VUE_APP_ROOT_API=${url}")
                }
            }

            writeFile file: ".env", text: "${newconfig}"
            echo "texte = ${newconfig}"

          } catch (e) {
            currentBuild.result = hudson.model.Result.FAILURE.toString()
            notifySlack(slackChannel, "Failed to edit .env file : " + e.getLocalizedMessage())
            throw e
          }
    }

    stage('Dependencies') {
        try {
            sh 'npm install'
        } catch (e) {
            currentBuild.result = hudson.model.Result.FAILURE.toString()
            notifySlack(slackChannel,e.getLocalizedMessage())
            throw e
        }
    }

    stage('Build') {
        try {
            sh 'npm run build'
        } catch (e) {
            currentBuild.result = hudson.model.Result.FAILURE.toString()
            notifySlack(slackChannel,e.getLocalizedMessage())
            throw e
        }
    }

 stage ('deploy to front servers...'){
        for (int i = 0; i < serverHostnames.size(); i++) { //Pour chaque serveur
            try {

             withCredentials([usernamePassword(credentialsId: 'develuser', passwordVariable: 'pass', usernameVariable: 'username'),
             string(credentialsId: "${serverHostnames[i]}", variable: 'hostname')
             ]) {

                echo "Deploy to ${serverHostnames[i]}"
                echo "--------------------------"
                sh "ssh -tt ${username}@${hostname} \"cd ${htmlBaseDir} && rm -rf -d js && rm -rf -d css\""
                sh "scp -r ${jsDir}* ${username}@${hostname}:${htmlBaseDir}"
             }

            } catch(e) {
                currentBuild.result = hudson.model.Result.FAILURE.toString()
                notifySlack(slackChannel,e.getLocalizedMessage())
                throw e
            }
        }
    }

    currentBuild.result = hudson.model.Result.SUCCESS.toString()
    notifySlack(slackChannel,"Congratulation !")
}

def notifySlack(String slackChannel, String info = '') {
    def colorCode = '#848484' // Gray

    switch (currentBuild.result) {
        case 'NOT_BUILT':
            colorCode = '#FFA500' // Orange
            break
        case 'SUCCESS':
            colorCode = '#00FF00' // Green
            break
        case 'UNSTABLE':
            colorCode = '#FFFF00' // Yellow
            break
        case 'FAILURE':
            colorCode = '#FF0000' // Red
            break;
    }

    String message = """
        *Jenkins Build*
        Job name: `${env.JOB_NAME}`
        Build number: `#${env.BUILD_NUMBER}`
        Build status: `${currentBuild.result}`
        Branch or tag: `${params.BRANCH_TAG}`
        Target environment: `${params.ENV}`
        Message: `${info}`
        Build details: <${env.BUILD_URL}/console|See in web console>
    """.stripIndent()

    return slackSend(tokenCredentialId: "slack_token",
            channel: "${slackChannel}",
            color: colorCode,
            message: message)
}