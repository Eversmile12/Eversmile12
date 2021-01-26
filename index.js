const mustache = require('mustache');
const fs = require('fs');
const fetch = require('node-fetch');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const MUSTACHE_MAIN_DIR = "./main.mustache";
const http = new XMLHttpRequest();



function fetchLatestArticles(){
    const url = "https://binaryroot.xyz/api/latest_post.php";
    http.open("GET",url);
    http.send();
    
    http.onload= (e) =>{
        let response = JSON.parse(http.responseText);
        console.log(response["post1"]["post-title"]);
        let dataToRender = {
            name: 'Vittorio',
            date: new Date().toLocaleDateString('en-GB',{
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'Europe/Rome',
            }),
            first_post_title: response["post1"]["post-title"],
            first_post_content: response["post1"]["post-content"],
            first_post_date: response["post1"]["post-date"],
            first_post_url: response["post1"]["post-url"],
            second_post_title: response["post2"]["post-title"],
            second_post_content: response["post2"]["post-content"],
            second_post_date: response["post2"]["post-date"],
            second_post_url: response["post2"]["post-url"],
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
        return http.responseText;
    }
}

fetchLatestArticles();

