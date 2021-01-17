const mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = "./main.mustache";


let dataToRender = {
    name: 'Vittorio',
    date: new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Europe/Rome',
      }),
};


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

generateReadme()