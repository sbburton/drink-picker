
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

console.log('linked')

let clickCount = 0;

document.querySelector('#clickme').addEventListener('click', getDrink)



function getDrink() {
  clickCount++

  let drink = document.querySelector('input').value
  console.log(drink)
  
  fetch(url + drink)
  
  .then(res => res.json())
  .then(data => {
    const length = data.drinks.length;
    console.log(data.drinks[clickCount % length])
    document.querySelector('h2').innerHTML = data.drinks[clickCount % length].strDrink
    document.querySelector('img').src = data.drinks[clickCount % length].strDrinkThumb

    // need to list ingredients


    document.querySelector('h3').innerHTML = data.drinks[clickCount % length].strInstructions
  })
  


  .catch(err => console.log(`error ${err}`))
  
}


