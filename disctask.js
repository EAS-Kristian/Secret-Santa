const fs = require('fs');
const { Client, GatewayIntentBits } = require("discord.js");
const express = require('express');
const { channel } = require('diagnostics_channel');
const app = express();
app.use(express.json())

let rawdata = fs.readFileSync('people.json');
let people = JSON.parse(rawdata);

const client = new Client({ intents: [8] })
client.login(process.env.DISCORD_BOT_TOKEN);

const images = {
    David: "https://i.imgflip.com/723m8h.jpg",

    Andrew: "https://i.imgflip.com/723m0z.jpg",

    Kaine: "https://i.imgflip.com/723lwk.jpg",

    Clark: "https://i.imgflip.com/723hi8.jpg",

    Lou: "https://i.imgflip.com/723mft.jpg",

    Kris: "https://i.imgflip.com/723mis.jpg",

    Kalem: "https://i.imgflip.com/723l41.jpg",

    Rhys: "https://i.imgflip.com/723lai.jpg",

    Ethan: "https://i.imgflip.com/723llu.jpg",

    Max: "https://i.imgflip.com/723lp1.jpg",

    Stu: "https://i.imgflip.com/723mqk.jpg"
}


SecretSanta = () => {
    let matches = []
    let hat = JSON.parse(JSON.stringify(people))
    for (i = 0; i < people.length; i++) { // Every Person
        unique = false
        while (!unique) {

            let num = Math.floor(Math.random() * hat.length) // Pick a Name
            //console.log(num)
            if (people[i].name != hat[num].name) { // Did I pick my name, if so, try again
                //console.log(people[i], "gets", hat.splice(num, 1)[0]) // If not show my secret santa selection
                let name = hat.splice(num, 1)[0].name
                //console.log(people[i].name, name)
                matches.push({santa:people[i],receiver:name})
                unique = true
            
            } else if(i == people.length -1) {
                let present = matches[0].receiver
                matches[0].receiver = people[i].name
                matches.push({santa:people[i],receiver:present})
                unique = true
            }
        }
    }
for (let match = 0; match < matches.length; match++){
    sendDiscordMessage(matches[match])
}
}
client.once("ready", async () => {  
    SecretSanta()
});
function testmessage() {
    for (var i = 0; i < people.length; i++) {
        console.log('sending ' + people[people.length - i - 1].name + ' to ' + people[i].id) 
    }
}
async function sendDiscordMessage(match) {
    let users = await client.users.fetch(match.santa.id)
     await users.createDM()
    
         users.send(images[ match.receiver]).catch(function(){
         console.log("Can't send to this user")
     })

}


