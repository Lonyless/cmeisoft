import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cmei } from 'src/app/core/model/cmei.model';
import { CmeiService } from 'src/app/core/services/cmei.service';

@Component({
  selector: 'app-cmei-list',
  templateUrl: './cmei-list.component.html',
  styleUrls: ['./cmei-list.component.css'],
})
export class CmeiListComponent implements OnInit {
  constructor(private fb: FormBuilder, public cmeiService: CmeiService) {
    this.cmeiService = cmeiService;
  }

  form: FormGroup;
  formEndereco: FormGroup;

  cmeiList: Cmei[];

  ngOnInit(): void {
    

    let endereco = [{ id: null, rua: null, numero: null, bairroId: null }];

    this.formEndereco = this.fb.group({
      id: [endereco[0].id],
      ruaEndereco: [endereco[0].rua, [Validators.required]],
      numeroEndereco: [endereco[0].numero, [Validators.required]],
      bairroId: [endereco[0].bairroId, [Validators.required]],
    });

    this.form = this.fb.group({
      nomCmei: ['', Validators.required],
    });

    this.cmeiService.listar().subscribe((res) => {
      this.cmeiList = res;
    }).unsubscribe;
  }
}
