import { UsuarioService } from 'src/app/services/usuario.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  protected usuarios: any;

  constructor(
    protected usuarioService: UsuarioService,
  ) {
    this.usuarioService.getAll().subscribe(
      res=>{
        this.usuarios = res
      }
    )

  }

}
