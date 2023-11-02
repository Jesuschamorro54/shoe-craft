import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  employeesList = [];

  employeesListData = [
    {
      id:'1',
      name: 'Sara Acuña Benavides 1',
      role: 'Cortador',
      admissionDate:'21-02-2012',
      state: -1,
      img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGseuv9n_kJhFzlq1RjQNPQ-OqL9YbgMKCWNBzKMaLCO4q_WQiWzmfjzPhcYyLHPscyl8&usqp=CAU'
    },
    {
      id:'1',
      name: 'Jesus Chamorro Martines 1',
      role: 'Ensamblador',
      admissionDate:'29-09-2023',
      state: 1,
      img:'https://i.insider.com/5899ffcf6e09a897008b5c04?width=1000&format=jpeg&auto=webp'
    },
    {
      id:'1',
      name: 'Sara Acuña Benavides 2',
      role: 'Cortador',
      admissionDate:'21-02-2012',
      state: 1,
      img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGseuv9n_kJhFzlq1RjQNPQ-OqL9YbgMKCWNBzKMaLCO4q_WQiWzmfjzPhcYyLHPscyl8&usqp=CAU'
    },
    {
      id:'1',
      name: 'Jesus Chamorro Martines 2',
      role: 'Ensamblador',
      admissionDate:'29-09-2023',
      state: -1,
      img:'https://i.insider.com/5899ffcf6e09a897008b5c04?width=1000&format=jpeg&auto=webp'
    },{
      id:'1',
      name: 'Sara Acuña Benavides 3',
      role: 'Cortador',
      admissionDate:'21-02-2012',
      state: 1,
      img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGseuv9n_kJhFzlq1RjQNPQ-OqL9YbgMKCWNBzKMaLCO4q_WQiWzmfjzPhcYyLHPscyl8&usqp=CAU'
    },
    {
      id:'1',
      name: 'Jesus Chamorro Martines 3',
      role: 'Ensamblador',
      admissionDate:'29-09-2023',
      state: 1,
      img:'https://i.insider.com/5899ffcf6e09a897008b5c04?width=1000&format=jpeg&auto=webp'
    },
  ];

  loading = false;

  constructor() { }

  getEmployees():Promise<any[]>{
    return new Promise( (resolve, reject) => {
      this.loading = true;
      setTimeout(() => {
        resolve(this.employeesListData);
        this.loading = false;
      }, 1000);
    })
  }

}
