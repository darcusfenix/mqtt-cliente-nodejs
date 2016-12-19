node {

    notify("Started")
    try {
        stage ('clonando proyecto git'){
            git branch: 'CEM-150',
            credentialsId: 'bitbucket',
            url: 'https://darcusfenix@bitbucket.org/tj-2016/front-end-jquery.git'
        }

        stage ("obteniendo dependencias npm"){
            sh "npm install"
        }

        stage ("validando eslint"){
            sh "npm run lint"
        }

        stage("generando imagen docker"){
            sh "npm run docker-build"
        }

        stage("corriendo imagen docker"){
            sh "npm run docker-run"
        }

        input "Iniciar testing e2e ?"

        stage ("testing e2e"){
            sh "npm test"
        }

        notify("Done")
    }catch(error){
        notify("Error: ${error}")
        currentBuild.result = "FAILURE"
    }


}


def notify(status){
    emailext (
      to: "juancvfenix@gmail.com",
      subject: "${status}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>${status}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at <a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a></p>""",
    )
}
