import { Component, OnChanges, Input, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'pm-star', 
    templateUrl: './star.component.html', 
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
    @Input() rating: number;
    starWidth: number;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void {  // This is a lifecycle method for Angular framework. It's like componentWillMount() in React. You have to implement it.
        this.starWidth = this.rating * 75 / 5;
    }

    onClick():void {
      this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
    }
}