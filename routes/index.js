var express = require('express');
var router = express.Router();
var path = require('path')

router.get("/", function (req,res) {
        return res.send("Richard");
    });
    
    
router.get("/health", function (req, res) {
        return res.send("OK");
        });
        
router.use('/docs', express.static(path.join(__dirname, 'openapi-html')));


module.exports = router