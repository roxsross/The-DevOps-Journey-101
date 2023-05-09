#!/bin/bash

RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m'

prompt() {
	printf "\n${1}${2}${NC}\n"
}

prompt_info() {
	prompt "$CYAN" "$1"
}

prompt_error() {
	prompt "$RED" "ERROR: $1"
}