import AntigenH from './AntigenH'
import AntigenO from './AntigenO'

class Serotype {
  id?: number

  antigen_h: AntigenH = new AntigenH()

  antigen_o: AntigenO = new AntigenO()
}

export default Serotype
