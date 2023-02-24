export class LevelSet {
 readonly titleWorker:string | undefined;
 level: number | undefined;
 constructor(title: string | undefined, level: number | undefined) {
  this.titleWorker = title;
  this.level = this.setLevel()
 }

 setLevel() {
  if(this.titleWorker === 'Budget/Accounting Analyst' || this.titleWorker === "Graphic Designer" || this.titleWorker === "Quality Control Specialist" || this.titleWorker === 'Software Developer') {
   return 3
  }
  if(this.titleWorker === 'Chief Graphic Designer' || this.titleWorker === "Quality Control Manager" || this.titleWorker === "Budget/Accounting Manager" || this.titleWorker === 'Lead Software Developer') {
   return 2
  }
  if(this.titleWorker === 'Founder' || this.titleWorker === 'Co-Founder') {
   return 1
  }
 }
}

export class Salary {
  workers: any;
  departmants: any;
  salaries: any;

 constructor(workers: any, departmants: any) {
  this.workers = workers
  this.departmants = departmants
  this.salaries = this.setResponse()
 }
  setResponse() {
  const newMap = new Map<any, any>()
  const salaries = new Array()

  this.workers.map((item:any, index:any)=>{
   if(newMap.has(item.departmant)&&index !==0) {
    newMap.forEach((value,key)=>{if(key === item.departmant){newMap.set(key, {salary:((value.salary*value.count) + item.salary)/(value.count+1), count:value.count+1})}})
   }
   else {
    if(item.departmant !== null) {
      newMap.set(item.departmant, {salary:item.salary, count:1})
    }
   }
   return item
  })
  
  this.departmants.map((item:any)=>{
    newMap.forEach((value,key)=>{if(item.id?.toString() === key){salaries!.push({departmant_name:item.departmant_name, avg_salary:value.salary})}})
  });
  return salaries
 }
}