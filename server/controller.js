let globalCarIndex = 3;

let cars = [
   {
      id: 1,
      make: 'Ford',
      model: 'Mustang SVT',
      year: 2004,
      imgURL: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthemustangsource.com%2Fwp-content%2Fuploads%2F2018%2F03%2Fmystichrome01-e1521993007638.jpg&f=1&nofb=1'
   },
   {
      id: 2,
      make: 'Hyundai',
      model: 'Veloster Turbo',
      year: 2016,
      imgURL: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.automotiverhythms.com%2Fwp-content%2Fuploads%2F2016%2F11%2FHyundai_Gurnade_Veloster_SEMA2016.jpg&f=1&nofb=1'
   }
]

module.exports = {

   getCompliments: (req, res) => {
      const compliments = ["Gee, you're a smart cookie!",
                    "Cool shirt!",
                    "Your Javascript skills are stellar.",
      ];
      // choose random compliment
      let randomIndex = Math.floor(Math.random() * compliments.length);
      let randomCompliment = compliments[randomIndex];
    
      res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
       const fortunes = [
         'Scott is an absolute unit',
         'The fortune you seek is in another cookie.',
         'A closed mouth gathers no feet.',
         'A conclusion is simply the place where you got tired of thinking.',
         'A cynic is only a frustrated optimist.',
         'A foolish man listens to his heart. A wise man listens to cookies.',
         'You will die alone and poorly dressed.',
         "A fanatic is one who can't change his mind, and won't change the subject.",
         "If you look back, you’ll soon be going that way.",
         'You will live long enough to open many fortune cookies.',
         'An alien of some sort will be appearing to you shortly.',
         'Do not mistake temptation for opportunity.',
         'Flattery will go far tonight.',
         'He who laughs at himself never runs out of things to laugh at.',
         'He who laughs last is laughing at you.',
         'He who throws dirt is losing ground.',
         'Some men dream of fortunes, others dream of cookies.',
         'The greatest danger could be your stupidity.',
         'We don’t know the future, but here’s a cookie.',
         "The world may be your oyster, but it doesn't mean you'll get its pearl.",
         'You will be hungry again in one hour.',
         'The road to riches is paved with homework.',
         'You can always find happiness at work on Friday.',
         'Actions speak louder than fortune cookies.',
         'Because of your melodic nature, the moonlight never misses an appointment.',
         'Don’t behave with cold manners.',
         "Don’t forget you are always on our minds.",
         'Fortune not found? Abort, Retry, Ignore.',
         'Help! I am being held prisoner in a fortune cookie factory.',
         "It’s about time I got out of that cookie.",
         'Never forget a friend. Especially if he owes you.',
         'Never wear your best pants when you go to fight for freedom.',
         'Only listen to the fortune cookie; disregard all other fortune telling units.',
         'It is a good day to have a good day.',
         'All fortunes are wrong except this one.',
         'Someone will invite you to a Karaoke party.',
         'That wasn’t chicken.',
         'There is no mistake so great as that of being always right.',
         'You love Chinese food.',
         'I am worth a fortune.',
         'No snowflake feels responsible in an avalanche.',
         'You will receive a fortune cookie.',
         'Some fortune cookies contain no fortune.',
         "Don’t let statistics do a number on you.",
         'You are not illiterate.',
         'May you someday be carbon neutral.',
         'You have rice in your teeth.',
         'Avoid taking unnecessary gambles. Lucky numbers: 12, 15, 23, 28, 37',
         'Ask your mom instead of a cookie.',
         'This cookie contains 117 calories.',
         'Hard work pays off in the future. Laziness pays off now.',
         'You think it’s a secret, but they know.',
         'If a turtle doesn’t have a shell, is it naked or homeless?',
         'Change is inevitable, except for vending machines.',
         'Don’t eat the paper.'
       ];
       let randomIndex = Math.floor(Math.random() * fortunes.length);
       let randomFortune = fortunes[randomIndex];
       res.status(200).send(randomFortune);
    },

    getAllCars: (req, res) => {
      res.status(200).send(cars);
    },

    addCar: (req, res) => {
      let {make, model, year, imgURL} = req.body;
      if (isNaN(+year)) { res.status(400).send('Must enter a number for the year'); }
      let newCar = {
         id: globalCarIndex,
         make,
         model,
         year: +year,
         imgURL: imgURL
      };
      globalCarIndex++;
      cars.push(newCar);
      console.log(cars);
      res.status(200).send(cars);
    },

    getCar: (req, res) => {
      const index = +req.params.id;
      for(let i = 0; i < cars.length; i++) {
         if (cars[i].id === index) { res.status(200).send(cars[i]); }
      }
    },

    editCar: (req, res) => {
      const index = +req.params.id;
      let {make, model, year, imgURL} = req.body;
      for(let i = 0; i < cars.length; i++) {
         if (cars[i].id === index) { 
            cars[i].make = make;
            cars[i].model = model;
            cars[i].year = +year;
            cars[i].imgURL = imgURL;
            res.status(200).send(cars); 
         }
      }

    },

    deleteCar: (req, res) => {
      if(+req.params.id === NaN) { res.status(400).send('Must send a number for the car you wish to delete');}
      const index = cars.findIndex(elem => elem.id === +req.params.id);
      cars.splice(index, 1);
      res.status(200).send(cars);
    }
}