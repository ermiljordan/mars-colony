export class NewEncounter {
  constructor(
    public date: string,
    public colonist_id: string,
    public atype: string,
    public action: string
  ){}
}
export interface Encounter {
  date: string;
  atype: string;
  action: string;
  id: number;
  colonist_id: number
}
export class NewColonist {
  constructor(
    public name: string,
    public job_id: string,
    public age: number
  ){}
}

export interface Colonist {
    name: string;
    job: number;
    id: number;
    age: number
}
export class Job {
  name: string;
  id: number;
  description: string;

}
export interface Aliens {
    type: string;
    submitted_by: string;
    id: number;
    description: string;
}
