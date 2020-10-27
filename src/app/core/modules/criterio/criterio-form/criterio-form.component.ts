import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Criterio } from 'src/app/core/model/criterio.model';
import { CriterioService } from 'src/app/core/services/criterioservice';

@Component({
  selector: 'app-criterio-form',
  templateUrl: './criterio-form.component.html',
  styleUrls: ['./criterio-form.component.css']
})
export class CriterioFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public criterioService: CriterioService) {
    this.criterioService = criterioService
  }

  form: FormGroup
  criterioList: Criterio[]

  ngOnInit(): void {

    this.criterioService.listar().subscribe(res =>
      this.criterioList = res
    ).unsubscribe

    this.form = this.formBuilder.group({
      criterios: new FormArray([])
    });

  }

}
