// your code here, it may be worth it to ensure this file only runs AFTER the dom has loaded.

document.addEventListener('DOMContentLoaded', function(){

  const allBtns = document.getElementsByClassName('uk-button')
  addBtn = allBtns[1]
  editBtn = allBtns[2]
  // debugger


  getPreviousCalories();



  addBtn.addEventListener('click', function(e){
    e.preventDefault();
    const ukInput = document.getElementsByClassName('uk-input')[3]
    const ukTextArea = document.getElementsByClassName('uk-textarea')[0]
    let newObj = [{calorie: ukInput.value, note: ukTextArea.value}]
    // debugger
    // console.log("help")
    fetch("http://localhost:3000/api/v1/calorie_entries", {
      method: 'POST',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({
        api_v1_calorie_entry: {
          calorie: ukInput.value,
          note: ukTextArea.value
          }
      })
    })
      .then(res => res.json())
      .then(function(){
        slapCaloriesOnDOM(newObj)
      })



  })

})

function getPreviousCalories(){
  fetch("http://localhost:3000/api/v1/calorie_entries")
  .then(resp => resp.json())
  .then(slapCaloriesOnDOM)
}

function slapCaloriesOnDOM(calorieEntries){
  const caloriesUl = document.getElementById('calories-list')

  calorieEntries.forEach(function(calorieEntry){
    caloriesUl.innerHTML += `
      <li class="calories-list-item">
        <div class="uk-grid">
          <div class="uk-width-1-6">
            <strong> ${calorieEntry.calorie} </strong>
            <span>kcal</span>
          </div>
          <div class="uk-width-4-5">
            <em class="uk-text-meta"> ${ calorieEntry.note } </em>
          </div>
        </div>
        <div class="list-item-menu">
          <a class="edit-button" id="edit-${calorieEntry.id}" uk-icon="icon: pencil" uk-toggle="target: #edit-form-container"></a>
          <a class="delete-button" id="delete-${calorieEntry.id}"uk-icon="icon: trash"></a>
        </div>
      </li>
    `

    //get button from modal
    //add event listener to button
    //inside modal button update record.
    //slap to dom

    let li = caloriesUl.querySelector(`#edit-${calorieEntry.id}`)
    li.addEventListener("click", updateCalorieEntry())



    // const editButton = calorieEntry.querySelector("#edit-button")
    //   console.log(editButton)

    // debugger
  })

}

function updateCalorieEntry(){
  editBtn.addEventListener("click", function(e){
    e.preventDefault;
    const updateCalories = document.querySelector('#update-calories-id')
    const updateNotes = document.querySelector('#update-notes-id')
    debugger
    fetch("http://localhost:3000/api/v1/calorie_entries/${calorieEntry.id}", {
      method: 'PATCH',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({
        api_v1_calorie_entry: {
          calorie: updateCalories.value,
          note: updateNotes.value
          }
      })
    })
      .then(res => res.json())
      .then(slapCalorieOnDom)

  })
}
