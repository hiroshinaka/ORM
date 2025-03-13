const router = require('express').Router();
const petModel = include('models/pet');

router.get('/', async (req, res) => {
  try {
    console.log("Pet page hit");
    const result = await petModel.findAll({
      attributes: ['pet_id', 'name']
    });
    res.render('pets', { allPets: result });
    console.log(result);
  } catch (err) {
      console.log("Error reading from MySQL");
      console.log(err);
    res.render('error', { message: 'Error reading from MySQL' });
  }
});

router.get('/deletePet', async (req, res) => {
    try {
      console.log("delete pet");
      let petId = req.query.id;
      if (petId) {
        console.log("petId: " + petId);
        let deletePet = await petModel.findByPk(petId);
        console.log("deletePet: ", deletePet);
        if (deletePet !== null) {
          await deletePet.destroy();
        }
      }
      res.redirect("/");
    } catch (ex) {
      console.log("Error connecting to MySQL");
      console.log(ex);
      res.render('error', { message: 'Error connecting to MySQL' });
    }
  });
router.post('/addPet', async (req, res) => {
    try {
      console.log("pet form submit");
      // Build a new pet instance with the expected fields
      let newPet = petModel.build({
        web_user_id: req.body.web_user_id,
        name: req.body.name,
        pet_type_id: req.body.pet_type_id
      });
      await newPet.save();
      res.redirect("/");
    } catch (ex) {
      console.log("Error connecting to MySQL");
      console.log(ex);
      res.render('error', { message: 'Error connecting to MySQL' });
    }
  });
  
  module.exports = router;