import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-give',
    templateUrl: './give.page.html',
    styleUrls: ['./give.page.scss'],
})
export class GivePage implements OnInit {
    clipSrc: string;
    hasHeader = false;
    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        if (this.route.snapshot.data.special) {
            const opt = this.route.snapshot.data.special;
            switch (opt) {
                case 'give':
                    this.clipSrc = 'https://forms.ministryforms.net/embed.aspx?formId=1ff80167-7159-4b4e-ae46-58674c3c5d9c';
                    this.hasHeader = false;
                    break;
                case 'store':
                    this.clipSrc = 'https://winnerschapelny.org/store';
                    this.hasHeader = false;
                    break;
                case 'radio':
                    this.clipSrc = 'http://radio.shoutcastmedia.net:8302/stream';
                    this.hasHeader = true;
                    break;
                case 'live':
                    this.clipSrc = 'https://www.youtube.com/channel/UCcaUxWoaZRUhnwFfBkXTLPw';
                    this.hasHeader = false;
                    break;
                case 'below':
                    this.clipSrc =  'https://winnerschapelny.org/get-connected/join-the-team';
                    this.hasHeader = false;
                    break;
                default:
                    this.clipSrc = 'https://forms.ministryforms.net/embed.aspx?formId=1ff80167-7159-4b4e-ae46-58674c3c5d9c';
                    this.hasHeader = false;
                    break;

            }
            console.log(this.clipSrc);
        }
    }
}
