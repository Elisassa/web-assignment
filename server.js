const express = require('express');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const legoData = require("./modules/legoSets");
const path = require('path');



//app.use(express.static('public'));
//app.use(express.static('views'));
app.use(express.static('public'));
app.set('view engine', 'ejs');//a4

legoData.initialize()
    .then(() => {
        app.get("/", (req, res) => {
            res.render("home");
        });
        app.get("/About", (req, res) => {
            res.render("About");
        });

        app.get("/lego/sets", async (req, res) => {
            try {
                const sets = req.query.theme ? await legoData.getSetsByTheme(req.query.theme) : await legoData.getAllSets();
                res.render("sets", { sets });
            } catch (err) {
                res.status(404).render('404', { message: `Error retrieving LEGO sets: ${err}` });
            }
        });

        
        app.get("/lego/sets/:set_num", (req, res) => {
            const set_num = req.params.set_num;
            legoData.getSetByNum(set_num)
                .then(set => {
                    res.render("set", { set, page: '/lego/sets' });
                })
                .catch((error) => {
                    res.status(404).render('404', { message: `Error: ${error}` });
                });
        });
        
       
        app.use((req, res, next) => {
            res.status(404).render('404', { message: "I'm sorry, we're unable to find what you're looking for" });
          });

        app.listen(HTTP_PORT, () => console.log(`Server listening on: ${HTTP_PORT}`));
    })
    .catch(error => console.error("Error initializing LEGO data:", error));