const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '',
  database: '',
  password: '',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM depremyardimdwh."Victims" ORDER BY "Id" ASC limit 10', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
}


const createUser = (request, response) => {
    const { fullname, phone } = request.body
    console.log(request.body)
    pool.query('insert into "Victims"'+ 
    '(NameSurname, Phone, County, District, Address, Building, Street, BuildingNumber, ApartmentNo, Latitude, Longitude, Avenue, Floor)'+ 
    'values ($fullname,$phone, $county, $district, $address, $building, $street, $buildingNumber,$apartmentNo,$latitude,$longitude,$avenue,$floor)' + 
    'RETURNING *', [fullname, phone], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Data added with ID: ${results.rows[0].id}`)
    })
}


module.exports = {
  getUsers,
  createUser,
}