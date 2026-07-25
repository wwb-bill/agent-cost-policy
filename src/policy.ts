import type{PolicyConfig,SessionState}from"./types.js";
const TIERS:Record<string,number>={{"gpt-5"}:11.25,{"gpt-4.1"}:10,{"claude-opus-4-8"}:90,{"claude-sonnet-5"}:18,{"gpt-4o"}:12.5,{"gpt-4o-mini"}:.75,{"claude-haiku-4-5"}:4.8,{"gemini-2.5-flash"}:.75};
export class CostPolicy{private s:SessionState;
 constructor(private config:PolicyConfig){this.s={spent:0,budget:config.sessionBudget,activeModel:config.downgradeChain?.[0]||"default",blocked:false};}
 record(model:string,tokens:number):SessionState{if(this.s.blocked)return this.s;const c=(TIERS[model]||5);const cost=(tokens/1000)*c;this.s.spent+=cost;if(this.s.spent>=this.s.budget){if(this.config.blockOnExceed)this.s.blocked=true;else if(this.config.downgradeChain){const i=this.config.downgradeChain.indexOf(model);if(i>=0&&i<this.config.downgradeChain.length-1)this.s.activeModel=this.config.downgradeChain[i+1];}}return this.s;}
 sessionSpent():number{return Math.round(this.s.spent*1e6)/1e6;}
 isBlocked():boolean{return this.s.blocked;}
 activeModel():string{return this.s.activeModel;}
 reset(){this.s.spent=0;this.s.blocked=false;}}