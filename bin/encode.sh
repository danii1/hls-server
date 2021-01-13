#!/bin/sh
BASE_URL=http://localhost:8000
FILENAME=$(openssl rand -hex 16)
KEYFILE="$FILENAME".key
openssl rand 16 > $KEYFILE
cp $KEYFILE ../keys
echo $BASE_URL/$KEYFILE > temp.keyinfo
echo $KEYFILE >> temp.keyinfo
echo $(openssl rand -hex 16) >> temp.keyinfo
ffmpeg -i "$1" -c:a aac -ar 44100 -b:a 192k -f hls -hls_time 5 -hls_list_size 0 -hls_key_info_file temp.keyinfo -hls_segment_type mpegts ../audio/"$FILENAME".m3u8
rm temp.keyinfo
rm $KEYFILE
