import { JSON } from '@/modules/shared/utils/types'

class Resistome {
  constructor(
    public aminoglycoside: string = '-',
    public bLactam: string = '-',
    public colistin: string = '-',
    public fosfomycin: string = '-',
    public fusidicAcid: string = '-',
    public glycopeptide: string = '-',
    public macrolide: string = '-',
    public nitroimidazole: string = '-',
    public oxazolidinone: string = '-',
    public phenicol: string = '-',
    public quinolone: string = '-',
    public rifampicin: string = '-',
    public sulphonamide: string = '-',
    public tetracycline: string = '-',
    public trimethoprim: string = '-',
  ) { }

  static fromJson(json: JSON): Resistome {
    const instance = new Resistome()

    if (json.aminoglycoside) instance.aminoglycoside = json.aminoglycoside
    if (json.b_lactam) instance.bLactam = json.b_lactam
    if (json.colistin) instance.colistin = json.colistin
    if (json.fosfomycin) instance.fosfomycin = json.fosfomycin
    if (json.fusidic_acid) instance.fusidicAcid = json.fusidic_acid
    if (json.glycopeptide) instance.glycopeptide = json.glycopeptide
    if (json.macrolide) instance.macrolide = json.macrolide
    if (json.nitroimidazole) instance.nitroimidazole = json.nitroimidazole
    if (json.oxazolidinone) instance.oxazolidinone = json.oxazolidinone
    if (json.phenicol) instance.phenicol = json.phenicol
    if (json.quinolone) instance.quinolone = json.quinolone
    if (json.rifampicin) instance.rifampicin = json.rifampicin
    if (json.sulphonamide) instance.sulphonamide = json.sulphonamide
    if (json.tetracycline) instance.tetracycline = json.tetracycline
    if (json.trimethoprim) instance.trimethoprim = json.trimethoprim

    return instance
  }

  toString(): string {
    return Object.values(this).filter((v) => v !== '-').join(', ')
  }
}

export default Resistome
