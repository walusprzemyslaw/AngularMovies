import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { genreCreationDTO } from '../genres.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css']
})
export class CreateGenreComponent implements OnInit {

  errors: string[] = [];
  
  constructor(private router: Router, private genreServices: GenresService) { }

  ngOnInit(): void {

  }

  saveChanges(genreCreationDto: genreCreationDTO) {
    this.genreServices.create(genreCreationDto).subscribe(() => {
    this.router.navigate(['/genres']);
  }, error => this.errors = parseWebAPIErrors(error));
  }
}
