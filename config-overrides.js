const path = require('path')
const {
    override,
    fixBabelImports,
    addWebpackAlias,
    // addLessLoader,
    // addDecoratorsLegacy
} = require('customize-cra')

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, // 支持 less sass stylus
    }),
    // 别名
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src'),
        '@resources': path.resolve(__dirname, 'src/resources'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
    }),
    // @ 修饰器
    // addDecoratorsLegacy(),
    // 支持antd主题定制
    // addLessLoader({
    //     lessOptions: {
    //         javascriptEnabled: true,
    //         ModifyVars: { "@primary-color": "#eee" },
    //         localIdentName: '[local]--[hash:base64:5]'
    //     }
    // }),
)