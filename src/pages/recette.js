import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"





const RecettePage = () => {
    


    var xhr2 = new XMLHttpRequest();
    xhr2.responseType = 'json';
    xhr2.open('POST', 'http://localhost:5000/graphql');
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.setRequestHeader('Accept', 'application/json');
    xhr2.send(JSON.stringify({ query: `{
      site(url: "https://www.marmiton.org/recettes/recette_christmas-cake-facile_382603.aspx") {
        nom: select(elem: ".main-title") {
          text
        }
        temps: select(elem: ".recipe-infos__total-time__value") {
          text
        }
        tailleprs: select(elem: ".recipe-infos__quantity") {
          taille: select(elem: ".recipe-infos__quantity__value") {
            text
          }
          taillenom: select(elem: ".recipe-infos__item-title") {
            text
          }
        }
        etapes: selectAll(elem: ".recipe-preparation__list") {
          texte: selectAll(elem: ".recipe-preparation__list__item") {
            text
          }
        }
        info: selectAll(elem: ".recipe-ingredients__group-title") {
          text
        }
        Ingredients: selectAll(elem: ".recipe-ingredients__list") {
          quantite: selectAll(elem: ".recipe-ingredient-qt") {
            text
          }
          nom: selectAll(elem: ".ingredient") {
            text
          }
        }
        ttotal: select(elem: ".recipe-infos__timmings__total-time") {
          text
        }
        tpreparation: select(elem: ".recipe-infos__timmings__preparation") {
          text
        }
        trepos: select(elem: ".recipe-infos__timmings__rest") {
          text
        }
        tcuisson: select(elem: ".recipe-infos__timmings__cooking") {
          text
        }
      }
    }
    
    
      
      
    ` }));

    return(
        <>
        {xhr2.onload = function () {
            console.log('test :', xhr2.response);
            var titre = xhr2.response.data.site.nom.text;
            
            if (xhr2.response.data.site.temps === undefined){
              var temps = xhr2.response.data.site.temps.text;
            }else{
              var temps = 'nd';
            }

            if (xhr2.response.data.site.tailleprs.taille === undefined){
              var taille = xhr2.response.data.site.tailleprs.taille.text;
            }else{
              var taille = 'nd';
            }

            if (xhr2.response.data.site.tailleprs.taillenom === undefined){
              var taillenom = xhr2.response.data.site.tailleprs.taillenom.text;
            }else{
              var taillenom = 'nd';
            }
            
            
            
            var etapes = xhr2.response.data.site.etapes;
            
            var Ingredients = xhr2.response.data.site.Ingredients;
            var info = xhr2.response.data.site.info;

            if (xhr2.response.data.site.ttotal === undefined){
              var ttotal = xhr2.response.data.site.ttotal.text.replace(/(\r\n|\n|\r|\n|\t)/gm, "");
            }else{
              var ttotal = 'nd';
            }

            if (xhr2.response.data.site.tpreparation === undefined){
              var tprep = xhr2.response.data.site.tpreparation.text.replace(/(\r\n|\n|\r|\n|\t)/gm, "");
            }else{
              var tprep = 'nd';
            }

            if (xhr2.response.data.site.trepos === undefined){
              var trepos = xhr2.response.data.site.trepos.text.replace(/(\r\n|\n|\r|\n|\t)/gm, "");
            }else{
              var trepos = 'nd';
            }

            if (xhr2.response.data.site.tcuisson === undefined){
              var tcuisson = xhr2.response.data.site.tcuisson.text.replace(/(\r\n|\n|\r|\n|\t)/gm, "");
            }else{
              var tcuisson = 'nd';
            }

            var etapesArray = [];
            var bonnevalue;

            console.log(etapes[0].texte);

            for (let [key, value] of Object.entries(etapes[0].texte)) {
              bonnevalue = value.text.replace(/(\r\n|\n|\r|\n|\t)/gm, "");
              etapesArray.push('\"'+ bonnevalue + '\"');
            }

            var infoArray = [];
            var bonnevaleur_info;
            

            var i = 0;
            var bonnevaleur_ingre_quantite;
            var bonnevaleur_ingre_nom;
            var ingredients_quantiteArray = [];
            var ingredients_nomArray = [];
            var objIngre={};
            var objIngrejs;
          
            var objIngrejson = {
              Ingredients : []
            }
            
            if (info.text == undefined || info.text == '0' || info.text == null){
              alert('oui') 
              for (let [key, value] of Object.entries(Ingredients[0].quantite)) {
                bonnevaleur_ingre_quantite = value.text.replace(/(\r\n|\n|\r|\n|\t)/gm, "");
                ingredients_quantiteArray.push(bonnevaleur_ingre_quantite);
              }
              for (let [key, value] of Object.entries(Ingredients[0].nom)) {
                bonnevaleur_ingre_nom = value.text.replace(/(\r\n|\n|\r|\n|\t)/gm, "");
                ingredients_nomArray.push(bonnevaleur_ingre_nom);
                
              }

              objIngrejson.Ingredients.push({
                "i" :  {
                  "nom" : ingredients_quantiteArray,
                  "quantité"  : ingredients_nomArray
                }
              });
            }else{
            infoArray.forEach(element =>{

              for (let [key, value] of Object.entries(info)) {
                bonnevaleur_info = value.text.replace(/(\r\n|\n|\r|\n|\t)/gm, "");
                infoArray.push(bonnevaleur_info);
              }

              alert('ounoni') 

              for (let [key, value] of Object.entries(Ingredients[i].quantite)) {
                bonnevaleur_ingre_quantite = value.text.replace(/(\r\n|\n|\r|\n|\t)/gm, "");
                ingredients_quantiteArray.push(bonnevaleur_ingre_quantite);
              }
              for (let [key, value] of Object.entries(Ingredients[i].nom)) {
                bonnevaleur_ingre_nom = value.text.replace(/(\r\n|\n|\r|\n|\t)/gm, "");
                ingredients_nomArray.push(bonnevaleur_ingre_nom);
                
              }
              i++;

              objIngrejson.Ingredients.push({
                [element] :  {
                  "nom" : ingredients_quantiteArray,
                  "quantité"  : ingredients_nomArray
                }
            });
            })
          }

            objIngrejs = JSON.stringify(objIngrejson);

            alert(objIngrejs);

            alert(infoArray);
            if (info ==! undefined){ //Si il y a plus qu'une catégorie d'ingrédients
              var infoArray = [];
              for (const element2 of info) {
                var info = JSON.stringify(element2);
                info=info.replace('{"text":"','');
                info=info.replace('\t','');
                info=info.replace('\n','');
                info=info.replace('/[\n\t\r]/g',"");
                info=info.replace('{','');
                info=info.replace('}','');
                info=info.replace('"','');
                infoArray.push(info);
                alert(info);
              }
            }else{
              infoArray = 'nd';
            }
            console.log(etapesArray, etapesArray[0])
            document.location.href="recetteView?titre="+ titre +"&temps=" + temps + "&taille=" + taille + "&infoArray=" + infoArray + "&taillenom=" + taillenom + "&ttotal=" + ttotal + "&tprep=" + tprep + "&tcuisson=" + tcuisson + "&trepos=" + trepos + "&etapesArray=" + etapesArray + "&ingredients=" + objIngrejs;
        }}

          
        </>
      )}
    
    
  
  export default RecettePage
  