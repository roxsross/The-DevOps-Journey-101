#!/bin/bash

if ! which docker > /dev/null; then
	. $(dirname $0)/color-prompt.sh
	prompt_info "Installing docker"

	sudo apt-get update && sudo apt-get install -y \
		ca-certificates \
		curl \
		gnupg || exit $?

	# Add Docker’s official GPG key
	sudo mkdir -p /etc/apt/keyrings && \
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

	# Setup the repository
	codename=$(awk -F= '/CODENAME/ {print $2; exit}' /etc/os-release)
	echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
	  https://download.docker.com/linux/ubuntu $codename stable" \
	  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

	# Install docker-ce and docker-compose
	sudo apt-get update && sudo apt-get install -y \
		docker-ce docker-ce-cli containerd.io docker-compose-plugin || exit $?

	# Verify docker is working
	sudo docker run --rm hello-world || exit $?
	sudo docker rmi hello-world:latest

	# Setup so that Docker can be run without sudo
	sudo usermod -aG docker `whoami`
fi

# Install multi-arch dependencies
if ! dpkg -s binfmt-support &> /dev/null || ! dpkg -s qemu-user-static &> /dev/null; then
	sudo apt-get update && \
	sudo apt-get install -y binfmt-support qemu-user-static
fi
exit $?