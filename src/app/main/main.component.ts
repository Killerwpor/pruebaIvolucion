import { Component, OnInit } from '@angular/core';

import {ApiHandlerService} from '../api-handler.service' //Se importa el servicio que maneja los llamados a la API

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 departamentos: [ 
   {
     descripcion: String,
     localizacionId: String
  }
 ];
    

departamentosDetail=[];
arrayAux=[];
inicioArray:number=0;
finalArray:number=10;

  constructor(public apiHandler: ApiHandlerService) { }

  ngOnInit(): void {
    this.apiHandler.getDepartaments().subscribe(result => {  //Aquí se llaman los departamentos para el select
    this.departamentos=result;
     });



  }

  onChange(value){ //Cada vez que se selecciona una item en el select se hace un llamado al API y se actualiza el array a mostrar
    let id=this.searchId(value);

    //Se reinicia el paginador
    this.inicioArray=0;
    this.finalArray=10;
    //Llamado a la API
    this.apiHandler.getDepartmentDetail(id).subscribe(result => {    
      this.departamentosDetail=result;
      this.arrayAux=this.departamentosDetail.slice(this.inicioArray,this.finalArray)
       });
  }

  searchId(value){ //Busca en el array de departamentos el ID del departamento
    for(let i in this.departamentos){
      if(this.departamentos[i].descripcion==value){
        return this.departamentos[i].localizacionId;
      }
    }
  }

  next(){ //Avanza 10 elementos hacia adelante en el array para el paginador
    this.inicioArray+=10;
    this.finalArray+=10;
    this.arrayAux=this.departamentosDetail.slice(this.inicioArray,this.finalArray)
    if(this.arrayAux.length==0)
      this.previous();
    

  }

  previous(){ //Retrocede 10 elementos en el array para el paginador
    this.inicioArray-=10;
    this.finalArray-=10;
    this.arrayAux=this.departamentosDetail.slice(this.inicioArray,this.finalArray)
    if(this.arrayAux.length==0)
    this.next();
  }

}
