//---------- Compliments/Fortune Section ----------//
document.getElementById("complimentButton").onclick = function () {
   axios.get("http://localhost:4000/api/compliment/")
       .then(function (response) {
         const data = response.data;
         alert(data);
       })
       .catch(error => console.log(error));
 };

 document.getElementById('fortuneButton').addEventListener('click', () => {
    axios.get(`${baseURL}/fortune/`)
      .then(res => {
         let myFortune = document.createElement('h2');
         myFortune.innerText = res.data;
         document.getElementById('fortuneButton').insertAdjacentElement('afterend', myFortune);
      })
      .catch(error => console.log(error));
 });
 //---------- End Compliments/Fortune Section ----------//




const baseURL = 'http://localhost:4000/api';

//---------- Print Cars to Page Function ----------//
function renderCarList(cars) {
   let carList = document.getElementById('carList');
   carList.innerHTML = '';
   for(let i = 0; i < cars.length; i++) {
      let title = document.createElement('div');
      let {id, make, model, year, imgURL} = cars[i];
      title.innerHTML = `<h1>${id}. ${year} ${make} ${model}</h1><div><img class="carPicture" src="${imgURL}" alt="${model}"></div>`;
      document.getElementById('carList').appendChild(title);
   }
};

//---------- Get All Cars ----------//
 document.getElementById('getCars').addEventListener('click', () => {
    axios.get(`${baseURL}/cars`)
      .then(res => renderCarList(res.data))
      .catch(error => console.log(error));
 });

 //---------- Add New Car ----------//
 document.getElementById('carSubmit').addEventListener('submit', (evt) => {
    evt.preventDefault();
    let bodyObj = {
       make: document.getElementById('carMake').value,
       model: document.getElementById('carModel').value,
       year: document.getElementById('carYear').value,
       imgURL: document.getElementById('carURL').value
    };
    axios.post(`${baseURL}/cars`, bodyObj)
      .then(res => renderCarList(res.data))
      .catch(error => console.log(error));

   document.getElementById('carMake').value = '';
   document.getElementById('carModel').value = '';
   document.getElementById('carYear').value = '';
   document.getElementById('carURL').value = '';
 });

 //---------- Edit an Existing Car ----------//
      //----------Populate and Show Edit Form ----------//
 document.getElementById('editCar').addEventListener('click', (evt) => {
    evt.preventDefault();
    let carIndex = document.getElementById('carIndex').value;
    if (isNaN(+carIndex)) { alert('Must enter a number'); return; }
    axios.get(`${baseURL}/cars/${carIndex}`)
      .then(res => {
         document.getElementById('editMake').value = res.data.make;
         document.getElementById('editModel').value = res.data.model;
         document.getElementById('editYear').value = res.data.year;
         document.getElementById('editURL').value = res.data.imgURL;
      })
      .catch(error => console.log(error));
    document.getElementById('carEdit').setAttribute('class', '');
 });
      //---------- Send Edited Car Info ----------//
 document.getElementById('carEdit').addEventListener('submit', (evt) => {
    evt.preventDefault();
    let carIndex = document.getElementById('carIndex').value;
    if (isNaN(+carIndex)) { alert('Must enter a number'); return; }
    let bodyObj = {
      make: document.getElementById('editMake').value,
      model: document.getElementById('editModel').value,
      year: document.getElementById('editYear').value,
      imgURL: document.getElementById('editURL').value
   };
   axios.put(`${baseURL}/cars/${carIndex}`, bodyObj)
      .then(res => renderCarList(res.data))
      .catch(error => console.log(error));
      document.getElementById('carEdit').setAttribute('class', 'hidden');

   document.getElementById('carIndex').value = '';
 });

//---------- Delete a Car ----------//
 document.getElementById('deleteCar').addEventListener('click', (evt) => {
    evt.preventDefault();
    let carIndex = document.getElementById('carIndex').value;
    document.getElementById('carIndex').value = '';
    if (isNaN(+carIndex)) { alert('Must enter a number'); return; }
    axios.delete(`${baseURL}/cars/${carIndex}`)
      .then(res => renderCarList(res.data))
      .catch(error => console.log(error));
 });