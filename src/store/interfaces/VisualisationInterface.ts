export interface Exemplaire {
   epn: string;
   rcr: string;
   lacunes_text_format: string;
   comments: string;
   periodes_detenues_intervals: Array<Interval>;
   periodes_manquantes_missings: Array<Interval>;
   missings959r: string;
}

export interface Interval {
   startYear: string;
   endYear: string;
   startNo: string;
   startMonth: string;
   startDay: string;
   startVol: string;
   endNo: string;
   endMonth: string;
   endDay: string;
   endVol: string;
   endYears: Array<EndInterval>;
}

export interface EndInterval {
   endYear: string;
   startNo: string;
   startMonth: string;
   startDay: string;
   startVol: string;
   endNo: string;
   endMonth: string;
   endDay: string;
   endVol: string;
}



export interface Intervalle {
   minimum: number;
   maximum: number;
}
