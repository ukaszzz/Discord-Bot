import * as dotenv from 'dotenv';
import * as Discord from 'discord.js';
import axios from 'axios';

dotenv.config();
const url = "https://api.coincap.io/v2"
const token = process.env.DISCORD_TOKEN;
 

const client = new Discord.Client({ 
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});


client.login(token);

client.on('ready', ()=> {
    console.log('logged');
    
});


const getPrice = async (ticker: string): Promise<number | undefined> => {
    try {
        const response = await axios.get(`${url}/rates/${ticker}`);        
        return response.data.data.rateUsd;
    } catch (err) {
        console.log(err);
        return undefined;
    }
};

const formatPrice = (price: number | string): string => {
    return `$${Number(price).toFixed(2)}`;
}

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('price')) {
        
        const content = message.content.slice(6);
        const price = await getPrice(content);

        if (price) {
            message.channel.send(`the price od ${content} is ${formatPrice(price)}`)
        }
    }
})