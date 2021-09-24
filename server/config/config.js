require('dotenv').config();

function config(){
    const conf ={
        production:{
            database: process.env.DATABASE,
            secret: process.env.SECRET,
        },
        development:{
            database: process.env.DATABASE,
            secret: process.env.SECRET,
        }
    }

    const environment = process.env.NODE_ENV || 'development';

    return conf[environment];
}

module.exports.config=config
