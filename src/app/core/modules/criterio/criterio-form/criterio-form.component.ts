import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
    this.criterioService = criterioService;
  }

  async refresh() {
    setTimeout(() => {}, 2000);
  }

  form: FormGroup;
  criterioList: Criterio[];

  dynamic = ['1', '2', '3', '4'];

  buildFormArray() {
    const values = this.dynamic.map((val) => new FormControl(false));

    return this.formBuilder.array(values);
  }

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

    this.form = this.formBuilder.group({
      criterios: this.buildFormArray(),
    });
  }

  onSubmit() {}

  onSubmitAux() {
    let valueSumbit = Object.assign({}, this.form.value);

    valueSumbit = Object.assign(valueSumbit, {
      criterios: valueSumbit.criterios
        .map((v, i) => (v ? this.dynamic[i] : null))
        .filter((v) => v != null),
    });

    console.log(valueSumbit);
  }
}
