<!-- TODO:
![Logo of the project]()
-->
# reveal_lightning
simple markdown editor and http server for [reveal.js](https://github.com/hakimel/reveal.js) presentation powered by electron.  
reveal.js is cool presentation tool that good-look presentation contents could create by html and markdown.  
presentation contents like this -> [https://revealjs.com](https://revealjs.com)

## Installing / Getting started

package is here ->
https://github.com/yukimura1227/reveal_lightning/releases

## Developing

```shell
git clone https://github.com/yukimura1227/reveal_lightning
cd reveal_lightning
npm install
```

### Building

```shell
cd distribution
npx electron-packager ../ reveal_lightning --platform=darwin,win32,linux --arch=x64
```

### Deploying / Publishing

Using github releases function.  
package upload to here ->
https://github.com/yukimura1227/reveal_lightning/releases

## Features

### Start Server locally
It's start http server on 8000 port when starting reveal_lightning.app.   
So you can access presentation content on http://localhost:8000/reveal_view.html

### Appearance
<!-- ![](https://raw.githubusercontent.com/yukimura1227/reveal_lightning/v0.0.2/readme_resource/area_explain.svg) -->
![](./readme_resource/area_explain.svg)

### Functions
#### 1. editor area
You can edit markdown here and then the text compile and display preview area automatically.

#### 2. preview area
Here is preview area.

#### 3. editor tool area
If you mouse over on the gear icon then show tool buttons.  
Tool buttons give

- direct paste image from clipboard
- add separator for change chapter
- add separator for change section
- presentation button(open system default browser)
- reload button for presentation area
- print button(open system default browser with print-pdf parameter)

#### 4. presentation area
Presentation contents result displays here.  
If you want to reload then you hover the gear icon and click reload button.

## Future functions

- [ ] button for adding useful style(ex. fragment function)
- [ ] right click menu instead of gear icon.
- [ ] useful keyboard shortcut.
- [ ] image paste from file.
- [ ] save and load files as any name.
- [ ] using mathjax on preview area.
- [ ] change server listen port anyself.
- [ ] change theme for reveal.js

## Contributing
If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Licensing
The code in this project is licensed under MIT license.
