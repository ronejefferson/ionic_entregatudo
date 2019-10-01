import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    protected usuarios:any;
  constructor(
    protected usuarioService:UsuarioService
  ) {
   this.usuarios=this.usuarioService.getAll();
  }

  
  doRefresh(event) {
    console.log('Begin async operation');
    this.usuarios=this.usuarioService.getAll();
    setTimeout(() =>{
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }
    
}

