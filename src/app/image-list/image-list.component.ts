import { Component, OnInit, HostListener } from '@angular/core';
import { ImageService, Image } from '../image.service';
import { Observable, Observer, Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {

  static ITEMS_PER_PAGE = 10;

  private _index = 0;

  private _scrollStream = new Subject<number>();

  private _images: Image[] = [];

  constructor(private _imageService: ImageService) {

  }

  get images(): Image[] {
    return this._images
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this._scrollStream.next(1);
  }

  ngOnInit() {
    this._scrollStream
      .startWith(1)
      .filter(() => ((window.innerHeight + window.scrollY) >= document.body.offsetHeight))
      .subscribe(() => {
        this._imageService.fetchImages(this._index, ImageListComponent.ITEMS_PER_PAGE)
          .retryWhen((errors) => errors.delay(1000))
          .subscribe((images) => {
            images.forEach(image => this._images.push(image));
          });
        this._index = this._index + ImageListComponent.ITEMS_PER_PAGE;
      });
  }
}
