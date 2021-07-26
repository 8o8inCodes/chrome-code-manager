# chrome-code-manager

This is still work in progres, I'd suggest not cloning this repo yet.

## About

This is a chrome react extention that will manage your Javascript code and inject them into specified webpages.

## Why?

If you want some script running in the backgroun every time you enter a page, instead of hitting F12 and writting it there. You can instead use this extention to automatically inject scripts to the webpage.

For example:
On www.twitch.tv while you watch a stream, after a few minutes, a button appears. You should press that button in order to claim reward points.
So you could write a script that would press that button whenever it appears, and save it in the extension's script manager. In the configuration you can set the URL match and BAM! Every time you enter twitch, the script will execute automatically.

## Setup

* Install dependencies ```npm i```

* Build extension ```npm run build```

* In chrome, click on "Manage Extensions"

* Click on "Load Unpacked"

* Select the "build" folder from this repository.

* Sometimes the GUI Glitches out, if it does that, restart chrome.

* Additionally there are some useful scripts in the "scripts" folder