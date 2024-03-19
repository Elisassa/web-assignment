const express = require('express');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const legoData = require("./modules/legoSets");
const path = require('path');

app.use(express.static('public'));
app.use(express.static('views'));


legoData.initialize()
    .then(() => {
        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "/views/home.html"));
        });
        app.get("/About", (req, res) => {
            res.sendFile(path.join(__dirname, "/views/About.html"));
        });

        app.get("/lego/sets", async (req, res) => { // add async
            try {
                if (req.query.theme) {
                    let sets = await legoData.getSetsByTheme(req.query.theme);
                    res.send(sets);
                } else {
                    let sets = await legoData.getAllSets();
                    res.send(sets);
                }
            } catch (err) {
                res.status(404).send(err);
            }
        });

        
        app.get("/lego/sets/:setNum", async (req, res) => { 
            try {
                let set = await legoData.getSetByNum(req.params.setNum); 
                if (set) {
                    res.send(set);
                } else {
                    throw 'Set not found'; 
                }
            } catch (err) {
                res.status(404).send(`LEGO set not found: ${err}`);
            }
        });
       
        app.use((req, res, next) => {
            res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
          });

        app.listen(HTTP_PORT, () => console.log(`Server listening on: ${HTTP_PORT}`));
    })
    .catch(error => console.error("Error initializing LEGO data:", error));
