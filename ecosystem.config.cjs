module.exports = {
    apps: [
        {
            name: 'Vault57-DevFront',
            port: '8841',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
