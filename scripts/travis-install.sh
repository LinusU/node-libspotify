#!/bin/bash

whoami
groups
uname -a
lsb_release --all

$base_dir = `pwd`


# fetching libspotify linux 64bits because that's what travis runs on
cd /opt
sudo wget https://developer.spotify.com/download/libspotify/libspotify-12.1.51-Linux-x86_64-release.tar.gz
sudo tar xzf libspotify-12.1.51-Linux-x86_64-release.tar.gz
cd libspotify-12.1.51-Linux-x86_64-release
sudo make install


cd $base_dir
mkdir spotify_key
echo "exports.login = '$LOGIN'" > spotify_key/passwd.js
echo "exports.password = '$PASSWORD'" >> spotify_key/passwd.js
pwd
cd spotify_key
pwd
wget $SPKEY
