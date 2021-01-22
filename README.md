# Installation

```
npm install
```

# Running

```
npm start
```

# Stream generation

To generate encrypted HLS chunks, encryption key and stream playlist(m3u8), run:

```
cd bin/
./encode track.m4a
```

where `track.m4a` is arbitrary music file on your disk. Output will be placed in `keys/` and `streams/` directories.
