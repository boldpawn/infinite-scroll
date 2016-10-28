import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable} from 'rxjs'
import 'rxjs/Rx';

const IMAGE_URL = "/api/image?start=20&size=10"

@Injectable()
export class ImageService {

  _images: Observable<Image[]>

  constructor(private _http: Http) { }

  private fetchImages(): Observable<Image[]> {
    return this._http
      .get(IMAGE_URL)
      .map((response) => response.json() as Image[])
  }

  getImages() {
    console.log("images requested");
    if (!this._images) {
      this._images = this.fetchImages();
    }
    return this._images;
  }

}

export class Image {

  constructor(public name: string, public url: string) {

  }

}
