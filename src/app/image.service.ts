import { Injectable, OnInit } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable} from 'rxjs'
import 'rxjs/Rx';

const IMAGE_URL = "/api/image"

@Injectable()
export class ImageService {

  constructor(private _http: Http) { }

  public fetchImages(start: number, size: number): Observable<Image[]> {
    var params: URLSearchParams = new URLSearchParams();
    params.set('start', String(start));
    params.set('size', String(size));
    console.log("http call with start param %s", start);
    return this._http
      .get(IMAGE_URL, { search: params })
      .map((response) => response.json() as Image[])
  }

}

export class Image {

  constructor(public name: string, public url: string) {

  }

}
