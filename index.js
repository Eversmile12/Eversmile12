const mustache = require('mustache');
const fs = require('fs');
const fetch = require('node-fetch');
const MUSTACHE_MAIN_DIR = "./main.mustache";

function fetchLatestArticles(){
    fetch("http://binaryroot.xyz/api/latest_post.php", {mode:'cors'})
    .then(
        function(response){
            if(response.status !== 200){
                console.log("looks like there was a problem fetching latest posts" + response.status);
                return;
            }
            response.json()
            .then(function(latestPosts){
                console.log(latestPosts);
                updateDataToRender(latestPosts);

            }).catch((err)=> {
                console.log('Error retrieving articles', err);
            })
        }
    )
}

function updateDataToRender(latestPosts){
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
        latestPosts: latestPosts
    }
    return dataToRender;
}




function generateReadme(){
    fs.readFile(MUSTACHE_MAIN_DIR, (err, data)=>{
        if(err){
            console.log(err);
            throw(err);
        }else{
            const output = mustache.render(data.toString(), dataToRender);
            fs.writeFileSync('README.MD', output);
        }
    })
}

generateReadme();
fetchLatestArticles();