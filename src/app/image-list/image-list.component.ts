import { Component, OnInit } from '@angular/core';
import { ImageService, Image } from '../image.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent {

  constructor(private _imageService: ImageService) { }

  get images(): Observable<Image[]> {
    return this._imageService.getImages();
  }

}
