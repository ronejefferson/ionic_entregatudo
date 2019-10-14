import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Route, Router } from '@angular/router';
import { MensagemService } from '../../services/mensagem.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

   protected email:string;
   protected senha:string;

  
  constructor (
    private googlePlus: GooglePlus,
  public afAuth: AngularFireAuth,
  protected router : Router,
  protected msg : MensagemService,
  private platform: Platform
  ){}
  ngOnInit() {
  }

  onsubmit(form){
    this.login()
  }

  loginWEB() {
    if(this.platform.is("cordova")){
      
    
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
    else{
          this.loginGooglePlus()
       }
  }
  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email,this.senha,)
    .then(
      res =>{
        console.log(res);
        this.router.navigate(["/"])
      },
      erro=>{
        console.log(erro);
        this.msg.presentAlert("ops", "E-mail e/ou senha invalida");
      }
    )
  }
    loginGooglePlus(){
      this.googlePlus.login({})
      .then(res => console.log(res))
      .catch(err => console.error(err));
    
}
  logout() {
    this.afAuth.auth.signOut();
    if(this.platform.is("cordova")){
      this.googlePlus.logout()
    }
  }

}