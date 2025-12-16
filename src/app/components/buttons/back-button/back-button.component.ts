import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button-back',
    templateUrl: './back-button.component.html',
    styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {
    @Input() path: string = '';
    @Input() title: string = 'Go back to home page';
}