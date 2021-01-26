const mustache = require('mustache');
const fs = require('fs');
const fetch = require('node-fetch');
const MUSTACHE_MAIN_DIR = "./main.mustache";
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const http = new XMLHttpRequest();




function fetchLatestArticles(){
    const url = "https://binaryroot.xyz/api/latest_post.php";
    http.open("GET",url);
    http.send();
    
    http.onreadystatechange= (e) =>{
        let response = JSON.parse(http.responseText);
        let dataToRender = {
            name: 'Vittorio',
            date: new Date().toLocaleDateString('en-GB',{
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'Europe/Rome',
                latestPosts: response,
            }),
        }
        fs.readFile(MUSTACHE_MAIN_DIR,(err, data)=>{
            if(err){
                console.log(err);
                throw(err);
            }else{
                const output = mustache.render(data.toString(), dataToRender);
                fs.writeFileSync('README.MD', output);
                console.log("readme created");
            }
        })
        return response;
    }
}

fetchLatestArticles();



function generateReadme(){
    console.log(fetchLatestArticles());
    let dataToRender = fetchLatestArticles();
    
}



// generateReadme();
