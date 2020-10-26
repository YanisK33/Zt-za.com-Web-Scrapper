import React from "react"
import { Link } from "gatsby"
import ReactHtmlParser from 'react-html-parser';

import Layout from "../components/layout"
import SEO from "../components/seo"

const RecetteViewPage = () => {
    var $_GET = [];
    var parts = window.location.search.substr(1).split("&");
    for (var i = 0; i < parts.length; i++) {
        var temp = parts[i].split("=");
        $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
    }
    console.log($_GET);
    if ($_GET.infoArray != "nd"){

    }else{
        var ingredientsParse = JSON.parse($_GET.ingredients)
        console.log('test', ingredientsParse.Ingredients[0].i)
        var lengthi = ingredientsParse.Ingredients[0].i.nom.length;
        var nomArray = [];
        var quantiteArray = [];
        var toutArray = [];
        var tempArray = [];

        console.log(lengthi)
        for (let i = 0; i < lengthi; i++) {
            console.log('oui', i);
            nomArray.push(ingredientsParse.Ingredients[0].i.nom[i]);
            quantiteArray.push(ingredientsParse.Ingredients[0].i.quantité[i]);
            tempArray.push('<li>' + ingredientsParse.Ingredients[0].i.nom[i] + ingredientsParse.Ingredients[0].i.quantité[i] + '</li>');
            
        }
        toutArray = tempArray.join("\n");
        console.log('ici', nomArray);
    }



return(
  <Layout>
      <>
    <h1>{$_GET.titre}</h1>
    <ul>Ingrédients :
    {ReactHtmlParser(toutArray)}
    </ul>
        </>
  </Layout>
  )
}

export default RecetteViewPage
