import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  protected usuario: Usuario = new Usuario;
  protected id: string = null;

  constructor(
    protected usuarioService: UsuarioService,
    protected alertController: AlertController,
    protected router: Router,
    protected activedRoute: ActivatedRoute,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
  }

  //função chamada toda vez que a pagina recebe foco;
  ionViewWillEnter(){
    this.id = this.activedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.usuarioService.get(this.id).subscribe(
        res => {
          this.usuario = res
        },
        erro => this.id = null
      )
    }
  }

  onsubmit(form) {
    if (this.id) {
      this.usuarioService.update(this.usuario, this.id).then(
        res => {
          this.presentAlert("Aviso", "Atualizado!");
          form.reset();
          this.usuario = new Usuario;
          this.router.navigate(['/tabs/listUsuario']);
        },
        erro => {
          console.log("Erro: " + erro);
          this.presentAlert("Erro", "Erro ao atualizar!");
        }
      )
    } else {
      this.usuarioService.save(this.usuario).then(
        res => {
          this.presentAlert("Aviso", "Cadastrado!");
          form.reset();
          this.usuario = new Usuario;
          this.router.navigate(['/tabs/listUsuario']);
        },
        erro => {
          console.log("Erro: " + erro);
          this.presentAlert("Erro", "Erro ao cadastrar!");
        }
      )
    }
  }

  async presentAlert(titulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }
  localAtual(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      this.usuario.lat =resp.coords.latitude
      // resp.coords.longitude
      this.usuario.lng =resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
  }

}
