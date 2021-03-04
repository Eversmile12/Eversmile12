const mustache = require('mustache');
const fs = require('fs');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const MUSTACHE_MAIN_DIR = "./main.mustache";
const http = new XMLHttpRequest();



function fetchLatestArticles(){
    
    const url = "https://api.binaryroot.xyz/github_getpost.php";
    http.open("GET",url);
    http.send();
    // Here we're are declaring the data we will pass to the mustache template
    http.onload= (e) =>{
        let response = JSON.parse(http.responseText);
        console.log(response)
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
            first_post_title: response["post 1"]["title"],
            first_post_content: response["post 1"]["excerpt"],
            first_post_date: response["post 1"]["date"].split(" ")[0],
            first_post_url: "https://binaryroot.xyz/post.php?post_id=" + response["post 1"]["id"],
            second_post_title: response["post 2"]["title"],
            second_post_content: response["post 2"]["excerpt"],
            second_post_date: response["post 2"]["date"].split(" ")[0],
            second_post_url: "https://binaryroot.xyz/post.php?post_id=" + response["post 2"]["id"]
        }

        // Here we read the file specified as a constant, render it again, and rewrite the README.MD
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

