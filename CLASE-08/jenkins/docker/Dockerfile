FROM jenkins/jenkins
USER root
# Setting up environment variables for Jenkins admin user
ENV JENKINS_USER admin
ENV JENKINS_PASS admin
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"
COPY default-user.groovy /usr/share/jenkins/ref/init.groovy.d/
RUN apt-get update && apt-get install -y \
                          apt-transport-https \
                          ca-certificates \
                          curl \
                          gnupg \
                          jq \
                          git \
                          bash \
                          unzip \
                          zip \
                          lsb-release
RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
  https://download.docker.com/linux/debian/gpg
RUN echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install
RUN apt-get update && apt-get install -y docker-ce-cli
USER jenkins

RUN jenkins-plugin-cli \
    --plugins \
    "blueocean docker-workflow" \
    sshd \
    pipeline-aws \
    pipeline-build-step \
    pipeline-github-lib \
    pipeline-rest-api \
    pipeline-stage-view \
    timestamper \
    aws-credentials \
    file-operations \
    branch-api \
    workflow-support \
    pam-auth \
    sshd \
    javax-mail-api \
    ws-cleanup \
    aws-global-configuration \
    build-timeout 