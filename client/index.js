document.getElementById("complimentButton").onclick = function () {
   axios.get("http://localhost:4000/api/compliment/")
       .then(function (response) {
         const data = response.data;
         alert(data);
       });
 };

const baseURL = 'http://localhost:4000/api';

function renderCarList(car) {
   let title = document.createElement('div');
   let {id, make, model, year, imgURL} = car;
   title.innerHTML = `<h1>${id}. ${year} ${make} ${model}</h1><div><img class="carPicture" src="${imgURL}" alt="${model}"></div>`;
   document.getElementById('carList').appendChild(title);

}

 document.getElementById('fortuneButton').addEventListener('click', () => {
    axios.get(`${baseURL}/fortune/`)
      .then(res => {
         let myFortune = document.createElement('h2');
         myFortune.innerText = res.data;
         document.getElementById('fortuneButton').insertAdjacentElement('afterend', myFortune);
      })
      .catch(error => console.log(error));
 });

 document.getElementById('getCars').addEventListener('click', () => {
    axios.get(`${baseURL}/cars`)
      .then(res => {
         let carList = document.getElementById('carList');
         carList.innerHTML = '';
         for(let i = 0; i < res.data.length; i++) {
            renderCarList(res.data[i]);
         }
      })
      .catch(error => console.log(error));
 });

 document.getElementById('carSubmit').addEventListener('submit', (evt) => {
    evt.preventDefault();
    let bodyObj = {
       make: document.getElementById('carMake').value,
       model: document.getElementById('carModel').value,
       year: document.getElementById('carYear').value,
       imgURL: document.getElementById('carURL').value
    };
    axios.post(`${baseURL}/cars`, bodyObj)
      .then(res => {
         let carList = document.getElementById('carList');
         carList.innerHTML = '';
         for(let i = 0; i < res.data.length; i++) {
            renderCarList(res.data[i]);
         }
      })
      .catch(error => console.log(error));
      document.getElementById('carMake').value = '';
      document.getElementById('carModel').value = '';
      document.getElementById('carYear').value = '';
      document.getElementById('carURL').value = '';
 });

 document.getElementById('editCar').addEventListener('click', (evt) => {
    evt.preventDefault();
    let carIndex = document.getElementById('carIndex').value;
    axios.get(`${baseURL}/cars/${carIndex}`)
      .then(res => {
         console.log(res.data);
         document.getElementById('editMake').value = res.data.make;
         document.getElementById('editModel').value = res.data.model;
         document.getElementById('editYear').value = res.data.year;
         document.getElementById('editURL').value = res.data.imgURL;
      })
    document.getElementById('carEdit').setAttribute('class', '');
 })

 document.getElementById('carEdit').addEventListener('submit', (evt) => {
    evt.preventDefault();
    let carIndex = document.getElementById('carIndex').value;
    let bodyObj = {
      make: document.getElementById('editMake').value,
      model: document.getElementById('editModel').value,
      year: document.getElementById('editYear').value,
      imgURL: document.getElementById('editURL').value
   };
   axios.put(`${baseURL}/cars/${carIndex}`, bodyObj)
      .then(res => {
         let carList = document.getElementById('carList');
         carList.innerHTML = '';
         for(let i = 0; i < res.data.length; i++) {
            renderCarList(res.data[i]);
         }
      });
      document.getElementById('carEdit').setAttribute('class', 'hidden');

 })

 document.getElementById('deleteCar').addEventListener('click', (evt) => {
    evt.preventDefault();
    let carIndex = document.getElementById('carIndex').value;
    document.getElementById('carIndex').value = '';
    if (isNaN(+carIndex)) { alert('Must enter a number'); return; }
    axios.delete(`${baseURL}/cars/${carIndex}`)
      .then(res => {
         let carList = document.getElementById('carList');
         carList.innerHTML = '';
         for(let i = 0; i < res.data.length; i++) {
            renderCarList(res.data[i]);
         }
      })
 })