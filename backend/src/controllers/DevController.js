const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login, avatar_url, bio } = response.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });
        }
    
        return res.json(dev);
    },

    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async update(req, res) {
        const { github_username } = req.params;
        const { name, bio, techs } = req.body;
        
        const techsArray = parseStringAsArray(techs);

        const devUpdate = {
            name,
            bio,
            techs: techsArray
        }

        const dev  = await Dev.findOneAndUpdate({ github_username }, devUpdate);

        return res.json(dev);
    },

    async delete(req, res) {
        const { github_username } = req.params;

        const dev = await Dev.findOne({ github_username });

        await Dev.findOneAndDelete({ github_username });

        return res.json(dev);
    }
}
