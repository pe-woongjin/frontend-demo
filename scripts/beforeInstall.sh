#! /bin/sh
if [ -d "/home/ec2-user/dist" ]
then
   echo exist directory
   rm -rf /home/ec2-user/dist/*
else
   echo not exist directory
   mkdir -p /home/ec2-user/dist
fi