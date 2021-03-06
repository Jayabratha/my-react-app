const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: { 
                '@primary-color': '#61dafb',
                '@text-color': '#ffffff',
                '@font-size-base': '14px'
             }
        })
);