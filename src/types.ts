export interface PolicyConfig{sessionBudget:number;downgradeChain?:string[];blockOnExceed?:boolean;}
export interface SessionState{spent:number;budget:number;activeModel:string;blocked:boolean;}