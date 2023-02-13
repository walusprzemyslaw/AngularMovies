import { Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  //movies: { title: string; releaseDate: Date; price: number; }[] | undefined;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void { }

  @Input()

  movies;

  @Output()
  onDelete = new EventEmitter<void>();

  remove(id: number) {
    //this.movies.splice(index, 1);
    this.moviesService.delete(id).subscribe(() => {
      this.onDelete.emit();
    });
  }
}
