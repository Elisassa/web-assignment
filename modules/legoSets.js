/********************************************************************************
* WEB322 – Assignment 04
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Rong Chen  Student ID: 132356221 Date:02/16/2024
*
* Published URL:https://tiny-erin-dragonfly-veil.cyclic.app/
********************************************************************************/
//legoSets.js
// Import data
const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

// Initialize LEGO sets array
let sets = [];

function initialize() {
  return new Promise((resolve, reject) => {
    setData.forEach(setElement => {
      let setWithTheme = { ...setElement, theme: themeData.find(themeElement => themeElement.id == setElement.theme_id).name }
      sets.push(setWithTheme);
      resolve();
    });
  });

}

function getAllSets() {
  return new Promise((resolve, reject) => {
    resolve(sets);
  });
}

function getSetByNum(setNum) {

  return new Promise((resolve, reject) => {
    let foundSet = sets.find(s => s.set_num == setNum);

    if (foundSet) {
      resolve(foundSet)
    } else {
      reject("Unable to find requested set");
    }

  });

}

function getSetsByTheme(theme) {

  return new Promise((resolve, reject) => {
    let foundSets = sets.filter(s => s.theme.toUpperCase().includes(theme.toUpperCase()));

    if (foundSets.length > 0 ) {
      resolve(foundSets)
    } else {
      reject("Unable to find requested sets");
    }

  });

}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme }
