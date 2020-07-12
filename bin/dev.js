const webpack = require('webpack');
const [webpackClientConfig, webpackServerConfig] = require('../webpack.config');
const nodemon = require('nodemon');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');                                                          //webpackDevMiddleware следит за всем кодом, который изменяется в нашем приложении
const express = require('express');                                                                                       //импортировали express

const hmrServer = express();                                                                                              // создали hmr сервер
const clientCompiler = webpack(webpackClientConfig);


hmrServer.use(webpackDevMiddleware(clientCompiler, {                                                                //use для подключения сторонних middleware
    publicPath: webpackClientConfig.output.publicPath,
    serverSideRender: true,                                                                                              //кладет информацию о бандле в request locals
    noInfo:  true,                                                                                                       //чтобы вся информация о сборке не сыпалась в консоль, а только та, которая нам нужна
    watchOptions: {
        ignore: /dist/,                                                                                                   //компиляция изменяет файлы в папке дист. нужно чтобы watcher не смотрел в папку дист, если изменится файл чтобы не пересобирал приложение
    },
    writeToDisk: true,
    stats: 'errors-only'                                                                                                  // error-only - инфа только об ошибках, выключает логи успешной компиляции, там много ненужной информации
}));

hmrServer.use(webpackHotMiddleware(clientCompiler, {
    path: '/static/__webpack_hmr',
}));

hmrServer.listen(3001, () => {
    console.log('HMR server successful started')
});

const compiler = webpack(webpackServerConfig);

compiler.run((err) => {
    if (err) {
        console.log('Compilation failed: ', err);
    }

    compiler.watch({}, (err) =>  {
        if (err) {
            console.log('Compilation failed: ', err);
        }
        console.log('Compilation was successfully');
    });

nodemon({
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [                                                                                                             //watch - следит за изменениями server и client //компиляция изменяет файлы в папке дист
        path.resolve(__dirname, '../dist/server'),
        path.resolve(__dirname, '../dist/client'),
    ]
})
});