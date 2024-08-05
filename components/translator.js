const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

class Translator {

  firstCharUcase(key,data,highlight){
    const isFirstCharUpcase = (String(key).charCodeAt(0) <= 90 && 
                                String(key).charCodeAt(0))  >= 65;
    if (isFirstCharUpcase){
        console.log("key:" + key + " data:" + data);
        const ret = (String.fromCharCode(data.charCodeAt(0)).toUpperCase() + String(data).slice(1));
        console.log("return:" + ret);
        if (highlight){
            return  `<span class="highlight">${ret}</span>`;
        }else{
            return ret;
        }
    }else{
        if (highlight){
            return  `<span class="highlight">${data}</span>`;
        }else{
            return data;
        }
    }
  }

  // Method to translate American to British English
  americanToBritish(text,highlight = false) {
    let translatedText = text;

    // Translate American-only words/phrases to British
    for (let key in americanOnly) {
      let regex = new RegExp(`\\b${key}\\b`, 'gi');
      translatedText = translatedText.replace(regex, (match)=> 
        this.firstCharUcase(match,americanOnly[key],highlight)
        );
    }

    // Translate American to British spelling
    for (let key in americanToBritishSpelling) {
      let regex = new RegExp(`\\b${key}\\b`, 'gi');
      translatedText = translatedText.replace(regex, (match) => 
        this.firstCharUcase(match,americanToBritishSpelling[key],highlight)
        );
    }

    // Translate American titles to British
    for (let key in americanToBritishTitles) {
      let regex = new RegExp(`\\b${key.replace(".","\.")}`, 'g');
      //console.log("American titles:" + key);
      translatedText = translatedText.replace(regex,  (match) => 
        this.firstCharUcase(match,americanToBritishTitles[key],highlight)
        );
    }

    // Convert time format from American to British (12:15 -> 12.15)
    if (highlight) {
        translatedText = translatedText.replace(/(\d{1,2}):(\d{2})/g, (match, p1, p2) => `<span class="highlight">${p1}.${p2}</span>`);
    } else {
        translatedText = translatedText.replace(/(\d{1,2}):(\d{2})/g, '$1.$2');
    }
    return translatedText;
  }

  // Method to translate British to American English
  britishToAmerican(text,highlight=false) {
    let translatedText = text;
/*
    // Translate American-only words/phrases to American
    for (let key in americanOnly) {
        let regex = new RegExp(`\\b${americanOnly[key]}\\b`, 'gi');
        console.log(this.firstCharUcase(americanOnly[key],key));
        translatedText = translatedText.replace(regex, (match) => {
            // Apply the firstCharUcase function to handle capitalization
            let translated = this.firstCharUcase(match, americanOnly[key]);
            console.log("Match: " + match + " => Translated: " + translated);
            return translated; // Return the correctly capitalized translation
        });
    }  
*/
  //  console.log("translatedText: " + translatedText);

    
    // Translate British-only words/phrases to American

    // Get all the keys from britishOnly
    let keys = Object.keys(britishOnly);

    // Sort keys by length in descending order
    keys.sort((a, b) => b.length - a.length);
    keys.forEach(key => {
        console.log(key +":"+britishOnly[key]);
      let regex = new RegExp(`\\b${key}\\b`, 'gi');
      translatedText = translatedText.replace(regex, (match) => 
        this.firstCharUcase(match,britishOnly[key],highlight)
        );
    });
    

    // Translate British to American spelling

    // Get all the keys from americanToBritishSpelling
     keys = Object.keys(americanToBritishSpelling);

    // Sort keys by length in descending order
    keys.sort((a, b) => b.length - a.length);
    keys.forEach(key => {
      let regex = new RegExp(`\\b${americanToBritishSpelling[key]}\\b`, 'gi');
      translatedText = translatedText.replace(regex, (match) => 
        this.firstCharUcase(match,key,highlight)
        );
    });

    // Translate British titles to American
    for (let key in americanToBritishTitles) {
      let regex = new RegExp(`\\b${americanToBritishTitles[key]}\\b`, 'g');
      translatedText = translatedText.replace(regex, key, highlight);
        
    }


    // Convert time format from British to American (12.15 -> 12:15)
    
    if (highlight) {
        translatedText = translatedText.replace(/(\d{1,2})\.(\d{2})/g, (match, p1, p2) => `<span class="highlight">${p1}:${p2}</span>`);
    } else {
        translatedText = translatedText.replace(/(\d{1,2})\.(\d{2})/g, '$1:$2');
    }

    return translatedText;
  }


 translate(text,locale,highlight=false) {
    if (locale==='american-to-british'){
        return this.americanToBritish(text,highlight);
    }else if (locale==='british-to-american'){
        return this.britishToAmerican(text,highlight);
    }
 }
}
 module.exports = Translator;
