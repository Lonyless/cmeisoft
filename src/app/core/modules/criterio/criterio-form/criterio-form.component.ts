import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Crianca } from 'src/app/core/model/crianca.model';
import { Criterio } from 'src/app/core/model/criterio.model';
import { CriancaService } from 'src/app/core/services/crianca.service';
import { CriterioEmmiterService } from 'src/app/core/services/criterio-emmiter.service';
import { CriterioService } from 'src/app/core/services/criterioservice';

@Component({
  selector: 'app-criterio-form',
  templateUrl: './criterio-form.component.html',
  styleUrls: ['./criterio-form.component.css'],
})
export class CriterioFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public criterioService: CriterioService,
    private criterioEmmiterService: CriterioEmmiterService,
    private route: ActivatedRoute
  ) {
    this.route = route;
    this.criterioService = criterioService;
  }

  @Input() form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      descricaoCriterio: ['', Validators.required],
      pesoCriterio: ['', Validators.required],
    });

    /*
    if (this.criterioEmmiterService.subsVar == undefined) {
      this.criterioEmmiterService.subsVar = this.criterioEmmiterService.invokeFirstComponentFunction.subscribe(
        (event) => {
          this.onSubmitAux(event);
          console.log('evento: ' + event);
        }
      );
    }
    */
  }

  onSubmit() {
    this.criterioService.adicionar(
      new Criterio(
        this.form.value.descricaoCriterio,
        this.form.value.pesoCriterio
      )
    );
  }

  /*
  onSubmitAux(listaCriterios) {
    let valueSumbit = Object.assign({}, this.form.value);

    valueSumbit = Object.assign(valueSumbit, {
      criterios: valueSumbit.criterios
        .map((v, i) => (v ? this.criterioList[i] : null))
        .filter((v) => v != null),
    });

    this.criancaService.listar().subscribe((crianca) => {
      valueSumbit.criterios.forEach((criterio: Criterio) => {
        this.criterioService.adicionarAux(
          criterio,
          crianca[crianca.length - 1]
        );
      });
    });
  }
  */

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
}
