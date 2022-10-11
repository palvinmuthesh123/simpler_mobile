import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import createDOMPurify from 'dompurify';
const DOMPurify = createDOMPurify(window);

@Pipe({
  name: 'parseLinks',
})
export class ParseLinksPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}
  transform(value: string, args?: any): any {
    return this._sanitizer.bypassSecurityTrustHtml(value.replace(/\bhttp[^ ]+/gi, this.urlwrapImg));
  }
  urlwrap(str) {
    return '<a href="' + str + '" target="_blank" onclick="event.stopPropagation()">' + DOMPurify.sanitize(str) + '</a>';
  }
  urlwrapImg(strIn) {
    let str = strIn.toLowerCase();
    if (
      str.indexOf('i.imgur.com') !== -1 ||
      str.indexOf('.png') !== -1 ||
      str.indexOf('.jpg') !== -1 ||
      str.indexOf('.jpeg') !== -1 ||
      str.indexOf('.gif') !== -1
    ) {
      // console.log("wrapping imgur: "+strIn)
      let s = DOMPurify.sanitize(strIn);
      return `<div class="img-container" onclick="openImageModal(event,'${s}')"> \
                  <img class="uploaded-img" src="${s}"><br clear="both"/>
                </div>`;

      // return '<div class="img-container" onclick="openImageModal(event,\''+str+'\')"><img class="uploaded-img" src="' + DOMPurify.sanitize(str) + '"><br clear="both"/></div>';
    }
    return '<a href="' + strIn + '" target="_blank" onclick="event.stopPropagation()">' + DOMPurify.sanitize(strIn) + '</a>';
  }
}
