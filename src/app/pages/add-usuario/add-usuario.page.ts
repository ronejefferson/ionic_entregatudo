import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  protected usuario: Usuario = new Usuario;
  protected id: string = null

  constructor(
    protected usuarioService: UsuarioService,
    protected alertController: AlertController,
    protected loadingController: LoadingController,
    protected router: Router,
    protected activedRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.paramMap.get("id");
    if(this.id){
      this.usuarioService.get(this.id).subscribe(
        res => {
          this.usuario = res
        },
        erro => this.id=null
      )
    }
  }

  onsubmit(form) {
    if(this.id){
      this.usuarioService.update(this.usuario, this.id).then(
        res => {
          this.presentAlert("Aviso", "Atualizado!");
          form.reset();
          this.usuario = new Usuario;
          this.router.navigate(['/tabs/listUsuario']);
          console.log("Cadastrado!");
  
        },
        erro => {
          console.log("Erro" + erro);
          this.presentAlert("Erro", "Erro ao cadastrar!");
        }
      )
    } else{
    this.usuarioService.save(this.usuario).then(
      res => {
        this.presentAlert("Aviso", "Cadastrado!");
        form.reset();
        this.usuario = new Usuario;
        this.router.navigate(['/tabs/listUsuario']);
        console.log("Cadastrado!");

      },
      erro => {
        console.log("Erro" + erro);
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


  async presentLoading(titulo2: string) {
    const loading = await this.loadingController.create({
      message: titulo2,
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }



}
