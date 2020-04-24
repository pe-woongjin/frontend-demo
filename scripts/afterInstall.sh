#! /bin/sh
SHELL_PATH=`pwd -P`
echo $SHELL_PATH

cp -rf  $SHELL_PATH/* /home/ec2-user/dist
