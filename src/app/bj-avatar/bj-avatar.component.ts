import { Component, ElementRef, Input, OnInit, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'bj-avatar', // Attribute selector
  // template: `<img *ngIf="props" [src]="props.src" [style.border] = "props.border" [style.border-radius] = "props.radius" />`
  template: `<img *ngIf="props" [src]="props.src" [style.border] = "props.border" [style.border-radius] = "props.radius"  alt=""/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BjAvatarComponent implements OnInit, OnChanges{
  props = {
    src: null,
    radius: null,
    border: null
  };
  private _el: HTMLElement;
  defaultSettings : any = {
    alphabetcolors : ["#5A8770", "#B2B7BB", "#6FA9AB", "#F5AF29", "#0088B9", "#F18636", "#D93A37", "#A6B12E", "#5C9BBC", "#F5888D", "#9A89B5", "#407887", "#9A89B5", "#5A8770", "#D33F33", "#A2B01F", "#F0B126", "#0087BF", "#F18636", "#0087BF", "#B2B7BB", "#72ACAE", "#9C8AB4", "#5A8770", "#EEB424", "#407887"],
    textColor : '#ffffff',
    defaultBorder : '5px solid white;',
    fontsize : 30, // unit in pixels
    height : 50, // unit in pixels
    width : 50, // unit in pixels
    fontWeight : 400, //
    charCount : 1,
    fontFamily : 'HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif',
    base : 'data:image/svg+xml;base64,',
    radius : '30px'
  }
  @Input('shape') shape: any ;
  @Input('textdata') textData: any ;
  @Input('numdata') numData: any ;
  @Input('height') height: any ;
  @Input('width') width: any ;
  @Input('fontsize') fontSize: any ;
  @Input('fontweight') fontWeight: any ;
  @Input('fontfamily') fontFamily: any ;
  @Input('avatarcustomborder') avatarCustomBorder: any ;
  @Input('charcount') charCount: any ;
  @Input('avatarborder') avatarBorder: any ;

  constructor(el: ElementRef, private sanitizer:DomSanitizer) {
    console.log('Hello BjAvatar Directive');
    this._el = el.nativeElement;
  }

  ngOnInit(){
    this.getAvatar();
  }
  ngOnChanges(){
    this.getAvatar();
  }
  getAvatar(){
    if (!this.textData || !this.numData ) {
      throw Error("Complete Avatar data not provided");
    }

    let params = {
      charCount : this.charCount || this.defaultSettings.charCount,
      data : this.numData,
      data2 : this.textData,
      textColor : this.defaultSettings.textColor,
      height : this.height || this.defaultSettings.height,
      width : this.width ||this.defaultSettings.width,
      fontsize : this.fontSize ||this.defaultSettings.fontsize,
      fontWeight : this.fontWeight || this.defaultSettings.fontWeight,
      fontFamily : this.fontFamily || this.defaultSettings.fontFamily,
      avatarBorderStyle : this.avatarCustomBorder,
      avatardefaultBorder : this.avatarBorder,
      defaultBorder : this.defaultSettings.defaultBorder,
      shape : this.shape
    };

    let c = params.data.substr(0, params.charCount).toUpperCase();
    let cobj = this.getCharObj(c, params.textColor, params.fontFamily, params.fontWeight, params.fontsize);
    // let colorIndex :any;
    // let color = '';


    let d = params.data2.substr(0, params.charCount).toUpperCase();
    let dobj = this.getCharObj2(d, params.textColor, params.fontFamily, params.fontWeight, params.fontsize);
    let colorIndex :any;
    //let color = '';

    let sobj = this.getCharacterObjects(dobj,cobj, params.textColor, params.fontFamily, params.fontWeight, params.fontsize);
    // console.log(sobj);
    // let c = params.data.substr(0, params.charCount).toUpperCase();
    // let cobj = this.getCharacterObject(c, params.textColor, params.fontFamily, params.fontWeight, params.fontsize);
    // let colorIndex : number;
    let color = '';

    if (c.charCodeAt(0) < 65) {
      color = this.getRandomColors();
    } else {
      colorIndex = Math.floor((c.charCodeAt(0) - 65) % this.defaultSettings.alphabetcolors.length);
      color = this.defaultSettings.alphabetcolors[colorIndex];
    }
    let svg = this.getImgTag(params.width, params.height, color);
    svg.appendChild(sobj);
    let lvcomponent = <HTMLElement> document.createElement('div').appendChild(svg);
    // console.log(lvcomponent.outerHTML);
    let svgHtml = window.btoa(lvcomponent.outerHTML);
    let base = this.defaultSettings.base;
    let _style = '';
    if (params.avatarBorderStyle) {
      _style = params.avatarBorderStyle;
    } else if (params.avatardefaultBorder) {
      _style = params.defaultBorder;
    }
    this.props = {
      src: null,
      radius: null,
      border: null
    };;
    this.props['src'] = this.sanitize(base+svgHtml);
    this.props['style'] = _style;
    if (params.shape) {
      if (params.shape === 'round') {
        this.props['radius'] = this.defaultSettings.radius  ;
      }
    }
  }

  getRandomColors() {
    let letters = '0123456789ABCDEF'.split('');
    let _color = '#';
    for (let i = 0; i < 6; i++) {
      _color += letters[Math.floor(Math.random() * 16)];
    }
    return _color;
  }

  getImgTag(width, height, color) {

    let svgTag = <HTMLElement>document.createElement('svg');

    this.setAttribs(svgTag,{
      'xmlns' : 'http://www.w3.org/2000/svg',
      'pointer-events' : 'none',
      'width' : width,
      'height' : height
    });
    svgTag.style.cssText ="background-color:"+ color+" ,width : "+width + 'px, height :' +height + 'px';
    svgTag.style.backgroundColor = color;
    svgTag.style.width = width + 'px';
    svgTag.style.height = height + 'px';
    return svgTag;
  }

  //Personal Customization Fxns
  getCharObj(character, textColor, fontFamily, fontWeight, fontsize) {
    let textTag = <HTMLElement>document.createElement('tspan')
    this.setAttribs(textTag,{
      'y' : '70%',
      'x' : '50%',
      'dy' : '0.35em',
      'pointer-events' : 'auto',
      'fill' : textColor,
      'font-family' : fontFamily
    });
    textTag.innerHTML = character;
    textTag.style.fontWeight = fontWeight;
    textTag.style.fontSize = fontsize + 'px';
    return textTag;
  }

  getCharObj2(character, textColor, fontFamily, fontWeight, fontsize) {
    let textTag = <HTMLElement>document.createElement('tspan')
    this.setAttribs(textTag,{
      'y' : '40%',
      'x' : '50%',
      'dy' : '0.35em',
      'pointer-events' : 'auto',
      'fill' : textColor,
      'font-family' : fontFamily
    });
    textTag.innerHTML = character;
    textTag.style.fontWeight = fontWeight;
    textTag.style.fontSize = fontsize + 'px';

    return textTag;
  }

  getCharacterObjects(obj1,obj2, textColor, fontFamily, fontWeight, fontsize) {
    let textTag = <HTMLElement>document.createElement('text');
    this.setAttribs(textTag,{
      'text-anchor'  : 'middle',
      'y' : '20%',
      'x' : '50%',
      'dy' : '0.35em',
      'pointer-events' : 'auto',
      'fill' : textColor,
      'font-family' : fontFamily
    });
    textTag.style.fontWeight = fontWeight;
    textTag.style.fontSize = fontsize + 'px';
    //console.log(obj1);
    // console.log(textTag);
    textTag.appendChild(obj1);
    textTag.appendChild(obj2);
    // console.log(textTag);
    return textTag;
  }


  getCharacterObject(character, textColor, fontFamily, fontWeight, fontsize) {
    let textTag = <HTMLElement>document.createElement('text');
    this.setAttribs(textTag,{
      'text-anchor'  : 'middle',
      'y' : '50%',
      'x' : '50%',
      'dy' : '0.35em',
      'pointer-events' : 'auto',
      'fill' : textColor,
      'font-family' : fontFamily
    });
    textTag.innerHTML = character;
    textTag.style.fontWeight = fontWeight;
    textTag.style.fontSize = fontsize + 'px';
    return textTag;
  }

  unescape(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  setAttribs(el, ob) {
    for(let key in ob) {
      el.setAttribute(key, ob[key]);
    }
    return el;
  }

}
