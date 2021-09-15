import Config from 'react-native-config'

import { IDrink, IDrinkUnparsed } from "src/types/api";

const apiURL = 'https://www.thecocktaildb.com/api/json/v1';
const token = Config.token ;

const baseUrl = `${apiURL}/${token}`;
const params = { method: 'GET', headers: { Accept: '*/*' } };

const search = (text = '') => {
  //dont have pagination so bring all and filter locally
  return (fetch(`${baseUrl}/search.php?s=${text}`, params)).then(res => {
    try{
      return res.json()
    }catch(e){
      return res
    }
  }).then((list) => {
    const listRes:IDrinkUnparsed[]  = list?.drinks || [];
    return listRes.map(item => {
      const strIngrdients = [];
      let index = 1;
      while (item[`strIngredient${index}`]) {
        strIngrdients.push({
          //@ts-ignore
          ingredient: item[`strIngredient${index}`],
          //@ts-ignore
          measurement: item[`strMeasure${index}`],
        });
        index += 1;
      }
      return {
        dateModified: item.dateModified,
        idDrink: item.idDrink,
        strAlcoholic: item.strAlcoholic,
        strCategory: item.strCategory,
        strCreativeCommonsConfirmed: item.strCreativeCommonsConfirmed,
        strDrink: item.strDrink,
        strDrinkAlternate: item.strDrinkAlternate,
        strDrinkThumb: item.strDrinkThumb,
        strGlass: item.strGlass,
        strIBA: item.strIBA,
        strImageAttribution: item.strImageAttribution,
        strImageSource: item.strImageSource,
        strIngrdients,
        strInstructions: item.strInstructions,
        strTags: item.strTags,
        strVideo: item.strVideo,
      } as IDrink
    }).sort((a, b) => ( a.strDrink.localeCompare(b.strDrink, 'en', { sensitivity: 'base' })  ));



  }).catch(err => {
    console.warn('fetch', { err });
  });
 
};

//

// const manageQuery = (pr) =>  pr.then(res => {
//   try{
//     return res.json()
//   }catch(e){
//     return res
//   }
// }).catch(err => {
//   console.warn('fetch', { err });
// });

// const getAllFilters =async () => {
//   //dont have pagination so bring all and filter locally
//  const res = await Promise.allSettled([
//     manageQuery(fetch(`${baseUrl}/list.php?c=list`, params)),
//     manageQuery(fetch(`${baseUrl}/list.php?g=list`, params)),
//     manageQuery(fetch(`${baseUrl}/list.php?i=list`, params)),
//     manageQuery(fetch(`${baseUrl}/list.php?a=list`, params)),
//   ])
//   return {
//     categories: res[0].status === 'fulfilled' ? res[0].value : [],
//     glasses: res[1].status === 'fulfilled' ? res[1].value : [],
//     ingredients : res[2].status === 'fulfilled' ? res[2].value : [],
//     alcoholic: res[3].status === 'fulfilled' ? res[3].value : [],
//   }
  
// };

const CocktailApi = {
  search,
};
export default CocktailApi;
