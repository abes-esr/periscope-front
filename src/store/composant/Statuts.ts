import {EnumStatuts} from '@/store/recherche/BlocDefinition';

const statuts = [
    {id: 0, text: 'Pôle de conservation', value: EnumStatuts.PC},
    {id: 1, text: 'Membre du plan', value: EnumStatuts.PA},
    {id: 2, text: 'Orphelin', value: EnumStatuts.Orphelin},
]

export default statuts;
