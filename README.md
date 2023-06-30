sudo usermod -a -G groupName userName
sudo usermod -a -G docker youtube_runner
chown youtube_runner:youtube_runner test.sh

# from parent folder of project
chown -R youtube_runner:youtube_runner fullstack-youtube

# add execution rights to build.sh file (if not it will throw permission denied error when running ./build.sh)
chmod u+x ./build.sh