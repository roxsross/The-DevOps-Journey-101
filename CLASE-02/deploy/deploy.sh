#!/bin/bash

repo="devops-static-web"

if [ "$(id -u)" -ne 0 ]; then
    echo -e "\033[33mCorrer con usuario ROOT\033[0m"
    exit
fi

echo "====================================="
apt-get update
echo -e "\e[92mEl Servidor se encuentra Actualizado ...\033[0m"

echo "====================================="

echo "install tools"
# validar si el paquete apache2 está instalado
if ! command -v apache2 &> /dev/null ; then
    echo -e "\e[92mInstalando Apache2 ...\033[0m"
    apt install -y apache2
    systemctl start apache2
    systemctl enable apache2
else
    echo -e "\e[96mApache esta realmente instalado \033[0m"
fi

# validar si el paquete git está instalado
if ! command -v git &> /dev/null ; then
    echo -e "\e[92mInstalando Git ...\033[0m"
    apt install -y git
else
    echo -e "\e[96mGit esta realmente instalado \033[0m"
fi

if [ -d "$repo" ]; then
    echo "La carpeta $repo existe"
    rm -rf $repo
fi

echo "====================================="
echo -e "\e[92mInstalling web ...\033[0m"
sleep 1

rm -rf devops-static-web
git clone -b devops-mariobros https://github.com/roxsross/devops-static-web.git 
cp -r devops-static-web/* /var/www/html
ls -lrt /var/www/html

echo "Happy gaming Mario Bross!!!"