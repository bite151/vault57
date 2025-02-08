module.exports = {
    apps: [
        {
            name: 'Vault57DevFront',
            port: '8841',
            exec_mode: 'cluster',
            instances: 'max',
            script: '.output/server/index.mjs',
            args: 'node PORT=8841 HOST=92.63.100.179'
        }
    ]
}
