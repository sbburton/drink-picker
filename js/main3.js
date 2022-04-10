
// the cocktail API
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

// Add event listener to 'which cocktail' input
document.querySelector('button').addEventListener('click', getDrink)

// fetch API Data
function getDrink() {

  // get drink from input
  let drink = document.querySelector('input').value

  fetch(url + drink)
  .then(res => res.json())
  .then(data => {
    
    // randomize which drink loads
    shuffleArray(data.drinks)

    // FIGURE OUT WTF IS GOING ON
    // console.log('data.drinks = ' + data.drinks)
    // console.log('data.drinks[0] = ' + data.drinks[0])
    // console.log(data.drinks[0].strIngredient1)
    // console.log(Object.keys(data.drinks[0]))


    // remove all existing lists
    // You have to append and remove <li>s on each click because you don't know how many there will be
    const allLis = document.querySelectorAll('li')
    for (const elem of allLis) {
      elem.remove();
    }

    // figure out how many ingredients are in the cocktail
    // and loop over them, add them to the page
    let ingredientCounter = 1
    do {

      // DUDE WTF IS THIS HOW CAN I NOT ACCESS THESE MORE SIMPLY
      // this is all to get the proper ingredient key list without going into NULL values
      let ingredientKey = `strIngredient${ingredientCounter}`
      // console.log('Key: ingredientKey' + ingredientCounter)
      let ingredient = data.drinks[0]
      let ingredientName = ingredient[ingredientKey]
      // console.log(ingredient[ingredientKey] || "didn't find an ingredient: " + ingredientKey)
      ingredientCounter++


      // create list element, add ingredient values to list, append to ul element
      let ul = document.querySelector('ul')
      let li = document.createElement('li')
      li.appendChild(document.createTextNode(ingredientName))
      ul.appendChild(li)
    }
    // end ingredients list when you first find a NULL Ingredients value
    while (data.drinks[0][`strIngredient${ingredientCounter}`] != null)


    // console.log(data.drinks[0])
    // add Drink Name, Drink Image, Drink Making Instructions
    document.querySelector('h2').innerText = data.drinks[0].strDrink
    document.querySelector('img').src = data.drinks[0].strDrinkThumb
    document.querySelector('h3').innerHTML = data.drinks[0].strInstructions
  })

  
  // catch errors ya dummy
  .catch(err => console.log(`error ${err}`))
}




// Fisher Yates! 
// shuffle array for drinksearch
function shuffleArray(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
 