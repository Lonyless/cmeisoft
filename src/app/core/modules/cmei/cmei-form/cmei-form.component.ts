import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cmei } from 'src/app/core/model/cmei.model';
import { CmeiService } from 'src/app/core/services/cmei.service';

@Component({
  selector: 'app-cmei-form',
  templateUrl: './cmei-form.component.html',
  styleUrls: ['./cmei-form.component.css']
})
export class CmeiFormComponent implements OnInit {

  form: FormGroup;

  constructor(public cmeiService: CmeiService, public fb: FormBuilder, private route: ActivatedRoute) {
    this.cmeiService = cmeiService
  }

  cmeiList: Cmei[]

  ngOnInit(): void {
    this.cmeiService.listar().subscribe(res => {
      this.cmeiList = res
    }).unsubscribe
    
    this.form = this.fb.group({
      cmeiOpcao1: [[Validators.required]],
      cmeiOpcao2: [[Validators.required]]
    })
  }

  validarCampo(campo) {

    return !this.form.get(campo).valid && this.form.get(campo).touched

  }

  cssErro(campo) {
    return {
      'has-error': this.validarCampo(campo)
    }
  }

  tabErro(campo) {
    return {
      'dngr': this.validarCampo(campo)
    }
  }

  log() {
    console.log(this.form)
  }

}
