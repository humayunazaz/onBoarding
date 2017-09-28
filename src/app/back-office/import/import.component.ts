import { Component, OnInit } from '@angular/core';
import {ImportService} from '../../services/imports.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  constructor(private importService : ImportService) { }

  importsList : any;
  selectImport : any;

  ngOnInit() {
      this.importService.listImports().subscribe(imports => {
          this.importsList = imports;

      });
  }

  forceImport() {
      this.importService.forceImport().subscribe(res => {
          console.log(res);
      });
  }

}
