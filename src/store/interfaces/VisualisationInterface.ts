export interface VisualisationInterface {
   association: string;
   rcr: string;
   gap_lacunes: string;
   intervals: Array<Intervals>;
   missings: Array<Intervals>;
   missings959r: string;
}

export interface Intervals {
   startYear: number;
   startYearDetails: Array<YearDetails>;
   endYear: number;
   endYearDetails: Array<YearDetails>;
}

export interface YearDetails {
   startNo: string;
   startMonth: string;
   startDay: string;
   startVol: string;
   endNo: string;
   endMonth: string;
   endDay: string;
   endVol: string;
}
