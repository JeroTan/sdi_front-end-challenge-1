import path from "path"; 

export default {
	entry: "./src/index.jsx",                           //Where your js files located and where the files should get to bundled it

  	mode: "development",                                //Development or production, So you don't to add "npm run dev"(vite) --mode development(webpack) or build in the cli

	module: {                                           //Use to define the transformer of the files or which files to transform
        rules: [                                        
            {
                test: /\.(js|jsx)$/,                        //Test is the regex to check what files to add
                exclude: /(node_modules|bower_components|dist)/, //What file or folders to exclude
                loader: "babel-loader",                     //Tranformer or transcriber of file need to use specifically
                options: { presets: ["@babel/env"] }        //IDk this one just add it or its like another layer of layer to specifically transform stuff
            },
            {
                test: /\.css$/,                         //Same but with css and be sure to add a css loader
                exclude: /(node_modules|bower_components|dist)/,
                use: ["style-loader", "css-loader", "postcss-loader"]       //For tailwindcss you may use posscss loader
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/i,          // For files
                exclude: /(node_modules|bower_components|dist)/,
                use: [
                    {
                    loader: 'file-loader',
                    },
                ],
            },
       ]
    },
    resolve: { extensions: [".js", ".jsx"] },      // When importing so you do not need to add react.js or index.js i mean extensions like .js .jsx

    output: {                                           // Where to put the bundled file after all your works
        path: path.resolve( "public/build/"),         // Don't be confused with publicPath, because this one uses what we call the path relative to root directory
        publicPath: "/build/",                           // But this one must be relative to index.html
        filename: "bundle.js"
    },

    optimization: {                                 //Minimizer
        minimize: true,
    },

    devServer: {
        static:{
            directory: path.join("public/"),  //Where to locate the index.html file incase we need to 
        },
        port: 8000,
        server: 'http',
        liveReload: true,
        historyApiFallback: true, //To allow self-routing on development
    },
};