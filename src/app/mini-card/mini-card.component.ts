import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.css']
})
export class MiniCardComponent implements OnInit {


  @Input() icon1!: string;
  @Input() title!: string;
  @Input() value!: number;
  @Input() color!: string;

  icon! : string;
  constructor() { }

  ngOnInit(): void {
    console.log(this.icon1)

    if(this.title == "Ticket en Attente"){
      this.icon = "hourglass_empty"
    }
    if(this.title == "Ticket en cours"){
      this.icon = "update"
    }
    if(this.title == "Ticket Terminé"){
      this.icon = "task_alt"
    }
    if(this.title == "Ticket Validé"){
      this.icon = "verified"
    }
  }

}
