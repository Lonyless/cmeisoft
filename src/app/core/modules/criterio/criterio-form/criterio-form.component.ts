import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Criterio } from 'src/app/core/model/criterio.model';
import { CriterioEmmiterService } from 'src/app/core/services/criterio-emmiter.service';
import { CriterioService } from 'src/app/core/services/criterioservice';

@Component({
  selector: 'app-criterio-form',
  templateUrl: './criterio-form.component.html',
  styleUrls: ['./criterio-form.component.css'],
})
export class CriterioFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public criterioService: CriterioService,
    private criterioEmmiterService: CriterioEmmiterService
  ) {
    this.criterioSelected = [];

    this.criterioService = criterioService;

    this.form = this.formBuilder.group({
      criterios: new FormArray([]),
    });
  }

  form: FormGroup;
  criterioList: Criterio[];

  criterioSelected: Array<number>;

  ngOnInit(): void {
    if (this.criterioEmmiterService.subsVar == undefined) {
      this.criterioEmmiterService.subsVar = this.criterioEmmiterService.invokeFirstComponentFunction.subscribe(
        (name: string) => {
          this.onSubmitAux();
        }
      );
    }

    this.criterioService.listar().subscribe((res) => (this.criterioList = res))
      .unsubscribe;

    //console.log(this.criterioList);
  }

  onSubmit() {}

  onSubmitAux() {
    this.criterioSelected.forEach((val) => console.log(val));

    //const criterio = new Criterio(this.form.value.id)
    //this.form.value.criterio.forEach((element) => {
    //this.criterioService.adicionarAux()
    //});
  }
}
