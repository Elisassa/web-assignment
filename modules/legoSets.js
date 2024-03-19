/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Rong Chen  Student ID: 132356221 Date:02/16/2024
*
* Published URL:https://github.com/ElisaRong122/web322-a2.git
********************************************************************************/
//legoSets.js
// Import data
const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

// Initialize LEGO sets array
let sets = [];

function initialize() {
    return new Promise((resolve, reject) => {
      try {
        setData.forEach((set) => {
          let themeObj = themeData.find(
            (theme) => theme.id === set.theme_id
          );
  
          if (themeObj) {
            let newSet = {
              set_num: set.set_num,
              name: set.name,
              year: set.year,
              theme_id: set.theme_id,
              num_parts: set.num_parts,
              img_url: set.img_url,
              theme: themeObj.name,
            };
            sets.push(newSet);
          } else {
            console.error("Not found");
          }
        });
        resolve(sets);
      } catch (error) {
        reject(error);
      }
    });
  }


// Get all sets
function getAllSets() {
    return new Promise((resolve, reject) => {
        try{
            resolve(sets);
        }catch (error) {
            reject(error);
        }
    });
}

// Get a specific set by set number
function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        try{
        let set = sets.find(set => set.set_num === setNum);
            resolve(set);
        } catch (error) {
            reject(error);
        }
    });
}

// Get sets by theme
function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        try{
        let filteredSets = sets.filter(set => set.theme.toUpperCase().includes(theme.toUpperCase()));
            resolve(filteredSets);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
