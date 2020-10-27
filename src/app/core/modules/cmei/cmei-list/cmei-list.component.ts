import { Component, OnInit } from '@angular/core';
import { Cmei } from 'src/app/core/model/cmei.model';
import { CmeiService } from 'src/app/core/services/cmei.service';

@Component({
  selector: 'app-cmei-list',
  templateUrl: './cmei-list.component.html',
  styleUrls: ['./cmei-list.component.css']
})
export class CmeiListComponent implements OnInit {

  constructor(public cmeiService: CmeiService) {
    this.cmeiService = cmeiService
  }

  cmeiList: Cmei[]

  ngOnInit(): void {
    this.cmeiService.listar().subscribe(res => {
      this.cmeiList = res
    }).unsubscribe
  }

}
