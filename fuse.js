const { FuseBox } = require('fuse-box')
const path = require('path')
const express = require('express')

const {
    QuantumPlugin,
    WebIndexPlugin,
    CSSPlugin,
    ImageBase64Plugin,
    PostCSSPlugin,
    UglifyJSPlugin,
    EnvPlugin
} = require('fuse-box')

const isProduction = !!process.env.NODE_ENV

const fuse = FuseBox.init({
    homeDir: 'src',
    tsConfig: './config/tsconfig.build.json',
    plugins: [
        EnvPlugin({ production: isProduction }),
        CSSPlugin(),
        WebIndexPlugin({
            title: 'Mithril HN',
            template: 'src/index.html'
        }),
        ImageBase64Plugin({ useDefault: true }),
        isProduction &&
            QuantumPlugin({
                removeExportsInterop: false,
                uglify: true,
                treeshake: true
            })
    ],
    output: 'dist/$name.js'
})

const vendor = fuse.bundle('vendor').instructions('~ index.ts')
const app = fuse.bundle('app').instructions(`!> [index.ts]`)

if (!isProduction) {
    fuse.dev({ root: false, port: 8090 }, server => {
        const dist = path.resolve('./dist')
        const app = server.httpServer.app
        app.use('/', express.static(path.join(dist)))

        app.get('*', function(req, res) {
            res.sendFile(path.join(dist, 'index.html'))
        })
    })
    app.sourceMaps(true).watch().hmr()
}

fuse.run()
