import {Component, OnInit} from '@angular/core';
import {PictureReferenceService} from "../../services/pictureReference.service";
import {ReferenceService} from "../../services/references.service";
import {MdDialog, MdDialogRef} from '@angular/material';
import {UploadComponent} from "./upload.component";

@Component({
    selector: 'app-files',
    templateUrl: 'list-packs.component.html',
    styleUrls: ['list-packs.component.css']
})
export class PackListComponent implements OnInit {

    constructor(private pictureReferenceService: PictureReferenceService,
                private referenceService : ReferenceService,
                public dialog: MdDialog
    ) { }

    listPacks : any;
    expandedItems = [];
    displayImgTab = [false];

    ngOnInit() {
        this.referenceService.getListPacks()
            .subscribe(
                packs => this.listPacks = packs
            );
    }

    openModalUpload(pack) {
        let dialogRef = this.dialog.open(UploadComponent, {
            data : pack
        });
        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

    deletePictureReference(id) {
        this.pictureReferenceService.delete(id).subscribe(res => {
            this.ngOnInit();
        });
    }

    expanded(i) {
        this.expandedItems[i] = !this.expandedItems[i];
    }

    displayImg(i) {
        console.log(this.displayImgTab[i]);
        this.displayImgTab[i] = !this.displayImgTab[i];
    }

}