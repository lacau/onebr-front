import { get } from 'lodash'
import { JSON } from '@/modules/shared/utils/types'

const mapListName = (list: JSON[] = []) => list.map((i: JSON) => i.name).join(', ') || '-'

class Experiment {
  constructor(
    public accessNoGb: string = '-',
    public assembler: string = '-',
    public barcode: string = '-',
    public city: string = '-',
    public clermontTyping: string = '-',
    public fimType: string = '-',
    public heavyMetal: string = '-',
    public host: string = '-',
    public identification: string = '-',
    public kLocus: string = '-',
    public origin: string = '-',
    public paperPublished: string = '-',
    public plasmidome: string = '-',
    public region: string = '-',
    public researcherName: string = '-',
    public sequencer: string = '-',
    public serovar: string = '-',
    public source: string = '-',
    public specie: string = '-',
    public st: string = '-',
    public virulome: string = '-',
    public wzc: string = '-',
    public wzi: string = '-',
    public antibiogram: JSON = {},
    public resistome: JSON = {},
    public date: string = '-',
    public contigsNo?: number,
    public dateOfAssembly?: Date,
    public genomeBp?: number,
    public geoLocationLat?: number,
    public geoLocationLong?: number,
    public id?: number,
    public sequencingDate?: Date,
    public serotype?: JSON,

  ) { }

  static fromResponse(response: JSON): Experiment {
    return Experiment.fromJson(response)
  }

  static fromJson(json: JSON): Experiment {
    const instance = new Experiment()

    if (json.id) instance.id = json.id
    if (json.barcode) instance.barcode = json.barcode
    if (json.identification) instance.identification = json.identification
    if (json.researcher_name) instance.researcherName = json.researcher_name
    if (json.specie) instance.specie = json.specie.name
    if (json.region) instance.region = json.region.name || '-'
    if (json.city) instance.city = json.city.name
    if (json.geo_location_lat) instance.geoLocationLat = json.geo_location_lat
    if (json.geo_location_long) instance.geoLocationLong = json.geo_location_long
    if (json.date) instance.date = json.date
    if (json.origin) instance.origin = json.origin.name || '-'
    if (json.source) instance.source = json.source.name || '-'
    if (json.host) instance.host = json.host
    if (json.st) instance.st = json.st
    if (json.k_locus) instance.kLocus = json.k_locus
    if (json.wzi) instance.wzi = json.wzi
    if (json.wzc) instance.wzc = json.wzc
    if (json.fim_type) instance.fimType = json.fim_type
    if (json.clermont_typing) instance.clermontTyping = json.clermont_typing.name
    if (json.serovar) instance.serovar = json.serovar.name
    if (json.sequencer) instance.sequencer = json.sequencer.name
    if (json.sequencing_date) instance.sequencingDate = new Date(json.sequencing_date)
    if (json.assembler) instance.assembler = json.assembler
    if (json.date_of_assembly) instance.dateOfAssembly = new Date(json.date_of_assembly)
    if (json.genome_bp) instance.genomeBp = json.genome_bp
    if (json.contigs_no) instance.contigsNo = json.contigs_no
    if (json.access_no_gb) instance.accessNoGb = json.access_no_gb
    if (json.paper_published) instance.paperPublished = json.paper_published
    if (json.plasmidome) instance.plasmidome = mapListName(json.plasmidome)
    if (json.virulome) instance.virulome = mapListName(json.virulome)
    if (json.heavy_metal) instance.heavyMetal = mapListName(json.heavy_metal)

    if (json.serotype) {
      instance.serotype = {
        antigenO: get(json.serotype, 'antigen_o.name', '-'),
        antigenH: get(json.serotype, 'antigen_h.name', '-'),
      }
    }

    if (json.antibiogram) {
      instance.antibiogram = json.antibiogram
      delete instance.antibiogram.id
    }

    if (json.resistome) {
      instance.resistome = {
        aminoglycoside: mapListName(json.resistome.aminoglycoside_set),
        bLactam: mapListName(json.resistome.blactam_set),
        colistin: mapListName(json.resistome.colistin_set),
        fosfomycin: mapListName(json.resistome.fosfomycin_set),
        fusidicAcid: mapListName(json.resistome.fusidicAcid_set),
        glycopeptide: mapListName(json.resistome.glycopeptide_set),
        macrolide: mapListName(json.resistome.macrolide_set),
        nitroimidazole: mapListName(json.resistome.nitroimidazole_set),
        oxazolidinone: mapListName(json.resistome.oxazolidinone_set),
        phenicol: mapListName(json.resistome.phenicol_set),
        quinolone: mapListName(json.resistome.quinolone_set),
        rifampicin: mapListName(json.resistome.rifampicin_set),
        sulphonamide: mapListName(json.resistome.sulphonamide_set),
        tetracycline: mapListName(json.resistome.tetracycline_set),
        trimethoprim: mapListName(json.resistome.trimethoprim_set),
      }
    }

    return instance
  }

  static empty() {
    return new Experiment()
  }
}

export default Experiment
