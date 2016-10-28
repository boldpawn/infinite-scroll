import { Component, OnInit, HostListener } from '@angular/core';
import { ImageService, Image } from '../image.service';
import { Observable, Observer, Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  private _size = 10;

  private _index = 0;

  private _scrollStream = new Subject<Event>();

  private _images: Image[] = [];

  constructor(private _imageService: ImageService) {

  }

  get images(): Image[] {
    return this._images
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this._scrollStream.next(event);
    }
  }

  ngOnInit() {
    this._imageService.fetchImages(this._index, this._size).subscribe((images) => {
      images.forEach((image) => {
        this._images.push(image)
      });
    });
    this._scrollStream
      .subscribe(() => {
        this._index = this._index + this._size;
        this._imageService.fetchImages(this._index, this._size).subscribe((images) => {
          images.forEach((image) => {
            this._images.push(image)
          }
          );
        });
      });
  }

}
