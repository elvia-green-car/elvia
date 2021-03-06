const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'app.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'css-loader',
                options: {
                    loaders: {
                        'css': 'css-loader'
                    }
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json']
    },

    devServer: {
        historyApiFallback: true,
        noInfo: true
    },

    performance: {
        hints: false
    },

    mode: 'development',
    devtool: 'eval',

    plugins: [
        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, 'src', 'index.html'), 
                    to: path.resolve(__dirname, 'dist') 
                },
                {
                    from: path.resolve(__dirname, 'src', 'sass'), 
                    to: path.resolve(__dirname, 'dist', 'sass') 
                }
             ]
        })
    ]
}
