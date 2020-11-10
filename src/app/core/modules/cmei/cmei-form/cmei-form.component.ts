import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cmei } from 'src/app/core/model/cmei.model';
import { CmeiService } from 'src/app/core/services/cmei.service';
import { EnderecoEmmiterService } from 'src/app/core/services/endereco-emmiter.service';
import { EnderecoService } from 'src/app/core/services/endereco.service';

@Component({
  selector: 'app-cmei-form',
  templateUrl: './cmei-form.component.html',
  styleUrls: ['./cmei-form.component.css'],
  providers: [EnderecoEmmiterService]
})
export class CmeiFormComponent implements OnInit {
  constructor(
    public cmeiService: CmeiService,
    public fb: FormBuilder,
    private enderecoService: EnderecoService,
    private route: ActivatedRoute,
    private enderecoEmitterService: EnderecoEmmiterService
  ) {
    this.enderecoService = enderecoService;
    this.cmeiService = cmeiService;
  }

  form: FormGroup;
  formEndereco: FormGroup;
  cmeiList: Cmei[];

  ngOnInit(): void {
    if (this.enderecoEmitterService.secondSubsVar == undefined) {
      this.enderecoEmitterService.secondSubsVar = this.enderecoEmitterService.invokeSecondComponentFunction.subscribe(
        () => {
          this.onSubmit();
        }
      );
    }

    let endereco = [{ id: null, rua: null, numero: null, bairroId: null }];

    this.formEndereco = this.fb.group({
      id: [endereco[0].id],
      ruaEndereco: [endereco[0].rua, [Validators.required]],
      numeroEndereco: [endereco[0].numero, [Validators.required]],
      bairroId: [endereco[0].bairroId, [Validators.required]],
    });

    this.form = this.fb.group({
      nomeCmei: ['', Validators.required],
      telefoneCmei: ['', Validators.required],
    });
  }

  ngOnDestroy() {
   
  }

  insertEndereco() {
    this.enderecoEmitterService.firstOnEvent();
  }

  onSubmit() {
    this.enderecoService.listar().subscribe((enderecos) => {
      let enderecoId;

      if (enderecos.length == 0) {
        enderecoId = 1;
      } else {
        enderecoId = enderecos[enderecos.length - 1].id;
      }

      const cmei = new Cmei(
        this.form.value.nomeCmei,
        this.form.value.telefoneCmei,
        enderecoId
      );
      console.log(cmei);
      this.cmeiService.adicionar(cmei).subscribe((sucess) => {
        console.log(sucess);
      });
    });
  }

  validarCampo(campo) {
    return !this.form.get(campo).valid && this.form.get(campo).touched;
  }

  cssErro(campo) {
    return {
      'has-error': this.validarCampo(campo),
    };
  }

  tabErro(campo) {
    return {
      dngr: this.validarCampo(campo),
    };
  }

  log() {
    //console.log(this.form.value.data.replace(/-/g, '/'));
  }
}
