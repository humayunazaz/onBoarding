import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialog} from '@angular/material';
import {PictureReferenceService} from "../../services/pictureReference.service";

@Component({
    selector: 'app-files',
    templateUrl: 'upload.component.html',
})
export class UploadComponent implements OnInit {

    picture : any;
    pack : any;
    url : any;

    constructor(private dialog : MdDialog,
                private pictureReferenceService: PictureReferenceService,
                @Inject(MD_DIALOG_DATA) public data: any)
    {
        this.pack = data;
        console.log(this.pack);
    }

    ngOnInit() {

    }

    ngOnChange(event) {
        this.picture = event.target;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event : any) => {
                this.url = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    uploadPictureReference() {
        if (this.picture.files && this.picture.files[0]) {
            let fileToUpload = this.picture.files[0];
            this.pictureReferenceService.postPictureReference(fileToUpload, this.pack.type, this.pack.code).subscribe(res => {
                this.dialog.closeAll();
            });
        }
    }
}
