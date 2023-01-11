const Logging = require('../models/logging.model');
const validation = require('../validators/about.validation');
const slugify = require('slugify');
const _ = require('lodash');
const fs = require('fs');


exports.create = async (req, res) => {   
    try {  
        const { error } = validation.createValidation(req.body);

        if (error) return res.status(400).json({ error: error.details[0].message });

        const doesAboutExist = await About.findOne({title: req.body.title});

        if (doesAboutExist) return res.status(400).json({ error: "About page already exists" });

        if (!req.files.image1) return res.status(400).json({ error: "The first image for the about page slider is required" });

        const title = req.body.title;

        const about = new About({
            title:  req.body.title,
            subTitle:  req.body.subTitle,
            description: req.body.description,
            image1: req.files.image1[0].path,
            image2: req.files.image2[0].path,
            image3: req.files.image3[0].path,
            postedBy: req.user._id,
            slug: slugify(title).toString().toLowerCase()
        });

        about.save();
        res.status(200).json(about);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
        return;
    }
};
    


exports.update = async (req, res) => { 
    try { 
        const { error } = validation.editValidation(req.body);

        if (error) return res.status(400).json({ error: error.details[0].message });

        const slug = req.params.slug.toLowerCase();

        const update = {};

        if(req.body.title) update.title = req.body.title;
        if(req.body.subTitle) update.subTitle = req.body.subTitle;
        if(req.body.description) update.description = req.body.description;
        if(req.body.title) update.slug = slugify(req.body.title).toString().toLowerCase();
        if(req.user._id) update.postedBy = req.user._id;

        if(req.files.image1){
            About.findOne({slug}).then(about => {
                fs.unlink(about.image1, (err) => {if (err) throw err;})
            })
            update.image1 = req.files.image1[0].path
        }

        if(req.files.image2){
            About.findOne({slug}).then(about => {
                fs.unlink(about.image2, (err) => {if (err) throw err;})
            })
            update.image2 = req.files.image2[0].path
        }

        if(req.files.image3){
            About.findOne({slug}).then(about => {
                fs.unlink(about.image3, (err) => {if (err) throw err;})
            })
            update.image3 = req.files.image3[0].path
        }
    
        About.findOneAndUpdate({slug}, update, {
            new: true
        }).then(about => res.json(about))
        .catch(err => res.status(404).json(err));
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
        return;
    }
};


exports.list = async (req, res) => {
    try {
        const about = await About.find({})
        .populate('postedBy', '_id name username')
        .select('_id title subTitle description image1 image2 image3 slug postedBy createdAt updatedAt')

        res.status(200).json(about);
    } catch (error) {
    res.status(500).json( { error: error.message });
    }
};


exports.read = async (req, res) => {
    try {
        const slug = req.params.slug.toLowerCase();

        const about = await About.findOne({slug})
        .populate('postedBy', '_id name username')
        .select('_id title subTitle description image1 image2 image3 slug postedBy createdAt updatedAt')

        if (!about) return res.status(400).json({ error: "About page does not exist." });

        res.status(200).json(about);
    } catch (error) {
        res.status(500).json( { error: error.message });
    }
};





