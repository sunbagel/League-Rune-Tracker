const puppeteer = require("puppeteer");

async function grabData(champ, role){

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    const baseURL = "https://u.gg/lol/champions/";
    champ = champ + "/";
    const end = "build?role=";
    
    const finalURL = baseURL + champ + end + role;
    await page.goto(finalURL);
    await page.waitForSelector(".champion-profile-page");

    //url is img url
    // var mainTreeURL = await page.$eval(".rune-image-container img", img => img.src);
    //alt is name
    // var mainTreeALT = await page.$eval(".perk-style-title", el => el.textContent);

    
    // var mainTreeALT = await page.$eval(".rune-image-container img", img => img.alt);
    //cut out "The Rune Tree " from string
    // mainTreeALT = "Primary Tree: " + mainTreeALT.substr(14);

    var keystoneURL = await page.$eval(".keystone-row .perk-active img", img => img.src);
    var keystoneALT = await page.$eval(".keystone-row .perk-active img", img => img.alt);
    keystoneALT = keystoneALT.substr(13);

    //.perk-active class is being shared.....
    // var smallRuneURL = await page.$eval(".perks .perk-active img", img => img.alt);
    // let smallRuneURL = await page.evaluate(()=>{
    //     //remember get src
    //     let runeURL = document.querySelectorAll(".perk-active > img");
    //     return runeURL; 
    // });
    
    // const testArr = Array.from(smallRuneURL, image => image.src);
    

    // const runeName = await page.$eval(".champion-header-info .champion-name", el => el.textContent);
    
    // let arrRunes = [mainTreeALT, mainTreeURL, keystoneALT, keystoneURL];
    let arrRunes = [keystoneALT, keystoneURL];

    await browser.close(); 

    return arrRunes;
    

};

module.exports = {
    grabData
}