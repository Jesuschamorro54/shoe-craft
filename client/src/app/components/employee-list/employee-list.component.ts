import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {

  employeesList=[
    {
      id:'1',
      name: 'Sara Acuña Benavides',
      role: 'Cortador',
      admissionDate:'21-02-2012',
      state: 1,
      img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGseuv9n_kJhFzlq1RjQNPQ-OqL9YbgMKCWNBzKMaLCO4q_WQiWzmfjzPhcYyLHPscyl8&usqp=CAU'
    },
    {
      id:'1',
      name: 'Jesus Chamorro Martines',
      role: 'Ensamblador',
      admissionDate:'29-09-2023',
      state: 1,
      img:'https://i.insider.com/5899ffcf6e09a897008b5c04?width=1000&format=jpeg&auto=webp'
    },
    {
      id:'1',
      name: 'Sara Acuña Benavides',
      role: 'Cortador',
      admissionDate:'21-02-2012',
      state: 1,
      img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGseuv9n_kJhFzlq1RjQNPQ-OqL9YbgMKCWNBzKMaLCO4q_WQiWzmfjzPhcYyLHPscyl8&usqp=CAU'
    },
    {
      id:'1',
      name: 'Jesus Chamorro Martines',
      role: 'Ensamblador',
      admissionDate:'29-09-2023',
      state: 1,
      img:'https://i.insider.com/5899ffcf6e09a897008b5c04?width=1000&format=jpeg&auto=webp'
    },
  ];

}
