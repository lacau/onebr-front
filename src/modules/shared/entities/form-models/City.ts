import Country from './Country'

class City {
  id?: number

  name?: string

  country: Country = new Country()
}

export default City
