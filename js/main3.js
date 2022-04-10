
// the cocktail API
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

// Add event listener to 'which cocktail' input
document.querySelector('button').addEventListener('click', getDrink)

// randomize which drink shows up


// fetch API Data
function getDrink() {

  // get drink from input
  let drink = document.querySelector('input').value

  fetch(url + drink)
  .then(res => res.json())
  .then(data => {
    
    // randomize which drink loads
    const shuffledOrderDrinkList = shuffleArray(data.drinks)


    // figure out wtf is going on
    
    // console.log('data.drinks = ' + data.drinks)
    // console.log('data.drinks[0] = ' + data.drinks[0])
    // console.log(data.drinks[0].strIngredient1)
    // console.log(Object.keys(data.drinks[0]))
    // let keys = Object.keys(data.drinks[0])
    // console.log()


    // remove all existing lists
    const allLis = document.querySelectorAll('li')
    for (const elem of allLis) {
      elem.remove();
    }

    // figure out how many ingredients are in the cocktail
    let ingredientCounter = 1
    do {

      // this is all to get the proper ingredient key list without going into NULL values
      let ingredientKey = `strIngredient${ingredientCounter}`
      console.log('Key: ingredientKey' + ingredientCounter)
      let ingredient = data.drinks[0]
      let ingredientName = ingredient[ingredientKey]
      console.log(ingredient[ingredientKey] || "didn't find an ingredient: " + ingredientKey)
      ingredientCounter++


      // add ingredients to list on webpage
      let ul = document.querySelector('ul')
      let li = document.createElement('li')
      li.appendChild(document.createTextNode(ingredientName))
      ul.appendChild(li)
    }
    // end ingredients list when you first find a NULL Ingredients value
    while (data.drinks[0][`strIngredient${ingredientCounter}`] != null)

    console.log(data.drinks[0])
    document.querySelector('h2').innerText = data.drinks[0].strDrink
    document.querySelector('img').src = data.drinks[0].strDrinkThumb
    document.querySelector('h3').innerHTML = data.drinks[0].strInstructions
  })
  .catch(err => console.log(`error ${err}`))
}

// shuffle array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
 