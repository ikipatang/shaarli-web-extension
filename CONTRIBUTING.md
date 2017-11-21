# Contribution Guide

Contributions are welcome and are greatly appreciated!

## Before you begin

This project uses the following technologies/standards.       
Please read and understand them before starting.      

- [JavaScript](mdn-js)    - The programming language.
- [Yarn][yarn]            - Package manager
- [Web-ext][web-ext]      - CLI Web-ext tool

## Setting up your environment

You will just need to install project and component dependencies via yarn

Slate remove your node_modules and do a clean install
```sh
npm run slate
```

## Try on a browser

To try it on a browser, you just need to start the with the command below and set your shaarli URL.         
```sh
npm run start # web-ext run
```

## Running Tests

There is no tests for now.      

## Linting

## Building
This will create a xpi that can be submitted on [addons.mozilla.org](https://addons.mozilla.org/fr/firefox/)
```sh
npm run build # web-ext build
``

[yarn]: https://yarnpkg.com/en/docs/install "Package manager"
[web-ext]: https://www.npmjs.com/package/web-ext "CLI Web-Ext tool"
