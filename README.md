# Shaarli Web Extension
Share your link to your Shaarli on Firefox Quantum.         
This add-on add a button allowing to share your current tab to your shaarli.        

**NB**: Shaarli is a minimalist link sharing service that you can install on your own server.           
See [shaarli](https://github.com/shaarli/Shaarli).      

## Why this project
[Aeris](https://bitbucket.org/aeris/shaarli-extension) made a really cool extension but with firefox version 57 (Quantum) the extension has become obsolete.    
So here we go for a Firefox Quantum Web-Extension.

## Where to find it
[Aeris/shaarli](https://addons.mozilla.org/fr/firefox/addon/shaarli/) version on firefox library has been updated       

## Features
- Share button in toolbar
- Share button in address bar (disabled by default)

### Extension settings
- Set your shaarli URL
- Set popup dimensions (numeric fields)
- Enable/disable share button in address bar

### TODO
- Allow popup dimensions to be saved on popup exit
- Allow multiple action on toolbar button (optional):
  - Share link
  - Go to shaarli

## Known bug
- Title and URL are uri_encoded twice in "Firefox for Linux"
**NB**: bug not present in dev mode and in windows

## LICENSE
The project is in licence GPL v3, see [LICENCE](LICENCE)
