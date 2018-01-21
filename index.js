"use strict";
const electron        = require("electron");
const {app, BrowserWindow, Menu} = electron;

const path       = require('path');
const url        = require('url');
const fs         = require('fs');
const parse_path = require('parse-filepath');

const settings = require('electron-settings');

const application_menu = require('./lib/js/main_process/application-menu');
const ipc_main = require('./lib/js/main_process/ipc_main');

global.mainWindow = null;

app.on('ready', () => {
  setup_application_common_setting();
  setup_server_root(settings.get('app.server_root'));
  setup_export_to();
  setup_user_work_dir();
  setup_target_markdown_path();
  setup_server_url();
  ipc_main.start_server(settings.get('server.port'));
  createWindow();
  const menu = Menu.buildFromTemplate(application_menu.menu_template);
  Menu.setApplicationMenu(menu);
});

function setup_export_to() {
  if(!settings.has('export.to')) {
    settings.set('export', { to: app.getPath('userData') + '/default_exports'});
  }
}

function setup_target_markdown_path() {
  if(!settings.has('target_md.file_path')) {
    var default_file_name  = 'sample.md';
    var file_relative_dir  = settings.get('env.work_dir_name') + '/sample';
    var file_relative_path = file_relative_dir + '/' + default_file_name;
    var file_dir           = settings.get('env.work_dir') + '/sample';
    var file_path          = file_dir + '/' + default_file_name;
    settings.set('target_md', {
      file_dir: file_dir,
      file_path: file_path,
      file_relative_dir: file_relative_dir,
      file_relative_path: file_relative_path
    });
    fs.writeFileSync(settings.get('app.config_file.load_target'), '{ "load_target": "' + file_relative_path + '" }');
    fs.writeFileSync(settings.get('app.config_file.theme'), '{ "theme_css_path": "node_modules/reveal.js/css/theme/black.css", "theme_css_filename": "black.css" }');
  }
}

function setup_application_common_setting() {
  var app_root_dir = __dirname;
  settings.set('app', {
    root_dir: app_root_dir,
    server_root: app.getPath('userData') + '/www',
    config_file: {
      load_target: app_root_dir + '/load_target.json',
      theme: app_root_dir + '/theme.json'
    }
  });
}

function setup_server_url() {
  if(!settings.has('server.port')) {
    settings.set('server', { port: '8000' });
  }
  var presentation_url = 'http://localhost:' + settings.get('server.port') + '/reveal_view.html';
  var print_url = presentation_url + '?print-pdf'
  settings.set('url', {
    presentation: presentation_url,
    print: print_url
  });
}

function setup_server_root(server_root) {
  if(!fs.existsSync(server_root)) {
    fs.mkdirSync(server_root);
  }
  var link_targets = [
    'index.html', 'reveal_view.html', 'load_target.json', 'theme.json',
    'node_modules', 'lib', 'readme_resource', 'work'
  ];
  for( var i = 0; i < link_targets.length; i++ ) {
    var link_dist = settings.get('app.root_dir') + '/' + link_targets[i];
    var link_from = server_root + '/' + link_targets[i];
    if(fs.existsSync(link_from) ) {
      fs.unlinkSync(link_from);
    }
    fs.symlinkSync(link_dist, link_from);
  }
}

function setup_user_work_dir() {
  if(!settings.has('env.work_dir')) {
    var default_work_dir_name = 'work';
    settings.set('env', {
      work_dir: settings.get('app.server_root') + '/' + default_work_dir_name,
      work_dir_name: default_work_dir_name
    });
  }
}

app.on('window-all-closed', () => {
  electron.session.defaultSession.clearCache(() => {});
  app.quit();
});

app.on('activate', () => {
  createWindow();
});

function createWindow() {
  if(global.mainWindow !== null ) {
    return;
  }
  global.mainWindow = new BrowserWindow({width: 960, height: 600});

  global.mainWindow.loadURL(url.format({
    pathname: path.join(settings.get('app.server_root'), '/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  // global.mainWindow.webContents.openDevTools();

  // ウィンドウが閉じられたらアプリも終了
  global.mainWindow.on('closed', () => global.mainWindow = null );
}
