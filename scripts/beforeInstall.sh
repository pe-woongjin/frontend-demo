#! /bin/sh
if [ -d "/home/ubuntu/dist" ]
then
   echo exist directory
   rm -rf /home/ubuntu/dist/*
else
   echo not exist directory
   mkdir -p /home/ubuntu/dist
fi