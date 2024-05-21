# This is for the frontend challenge.


### Specification:
Node.JS Version:    v20.13.1
    - Other dependencies are written in package.json. You may see it there.
    Also, the Node.JS type is a Module not common JS


### Overview:
    JS framework: React
    CSS framework: TailwindCSS
    Bundler: Webpack
    

### For the project to start use the command:
> npm install 
To install all the project dependencies.

> npm run dev
Now the project is available at   <>>>>>>      http://localhost:8000      <<<<<<>
You may also use all the files in public directory but this is not recommended if you don't have a running server so the above command is a must.
Why? Images will not be loaded if you just grab the index.html.


### IMPORTANT!!!!!
The apis are blocked by CORS. Good thing I have 2 solution for this one. So what I did is I created a copy of json in src/Utilities/Api.jsx if ever the fetching of data failed. The second is hacking your browser to bypass cors restriction, however this will lead you to vulnerable browsing experience. With this in mind, I use chrome for this demo. There is a flag to disable cors completely for the sole purpose of this test (BUT BE SURE TO PUT IT BACK)

1. Go to your chrome icon or exe file which is usually in programFiles in your C: //IF you know the CLI or CMD then just go to he exe file of chrome by using cd command or such
2. Copy and Create a shortcut somewhere
3. Right Click the shortcut and select properties
4. Find the target field and insert this at the end of text --disable-web-security --user-data-dir="C:/ChromeDevSession"
            For example "C:/Something/Files/chrome.exe" --disable-web-security --user-data-dir="C:/ChromeDevSession"
            //Same thing for CLI:
            "chrome.exe" --disable-web-security --user-data-dir="C:/ChromeDevSession"






### **Author NOTES:**
- Things in helpers directory are ALL of my self made helpers I created long ago to solve some misbehaving problems in javascript. I humbly suggest to not disclose the helper directory

- You may notice that some configuration like in webpack.config.js have comments. Those comments are written by me long ago so that installing react from scratch is streamline.

- The resources files is located at public/storage. I assume that this is supposedly an image from backend storage so I named it public/storage.
    * I also notice that the "tmsph-logo.jpg" is missing in resources although it is available in get request of https://tmsph-sdi-challenges.pages.dev/challenges/authors.json. What I did is find a logo online that fits with the brand.

- This Project has basic responsive layout to some extent. Though if I have time maybe, I will lookout for more screen layouts such as landscape mobile screen. 
    
