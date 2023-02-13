import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { genreDTO } from 'src/app/genres/genres.model';
import { GenresService } from 'src/app/genres/genres.service';
import { movieDTO } from '../movies.model';
import { MoviesService } from '../movies.service';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private genresService: GenresService,
    private location: Location, // w celu modyfikacji co znajduje się w URL
    private activatedRoute: ActivatedRoute) { }

  form: FormGroup;

  genres: genreDTO[];

  movies: movieDTO[];

  currentPage = 1;
  recordsPerPage = 10;
  initialFormValues: any;
  totalAmountOfRecords;


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      genreId: 0,
      upcomingReleases: false,
      inTheaters: false,
    });

    this.initialFormValues = this.form.value; //aby nie resetować wszystkiego 1.1
    this.readParamsFromURL();

    this.genresService.getAll().subscribe(genres => {
      this.genres = genres;

      this.filterMovies(this.form.value);

      this.form.valueChanges
      .subscribe(values => {
        this.filterMovies(values);
        this.writeParamsInURL();
      });
    });
        
  }

  filterMovies(values: any) {
    values.page = this.currentPage;
    values.recordsPerPage = this.recordsPerPage;
    this.moviesService.filter(values).subscribe((response: HttpResponse<movieDTO[]>) => {
      this.movies = response.body;
      this.totalAmountOfRecords = response.headers.get("totalAmountOfRecords");
    });
  }

  private readParamsFromURL(){
    this.activatedRoute.queryParams.subscribe(params => {
      var obj: any = {};

      if (params.title){
        obj.title = params.title;
      }

      if (params.genreId){
        obj.genreId = Number(params.genreId);
      }

      if (params.upcomingReleases){
        obj.upcomingReleases = params.upcomingReleases;
      }

      if (params.inTheaters){
        obj.inTheaters = params.inTheaters;
      }

      if (params.page){
        this.currentPage = params.page;
      }

      if (params.recordsPerPage){
        this.recordsPerPage = params.recordsPerPage;
      }

      this.form.patchValue(obj);
    })
  }

  private writeParamsInURL(){
    const queryStrings = [];

    const formValues = this.form.value;

    if (formValues.title){
      queryStrings.push(`title=${formValues.title}`);
    }

    if (formValues.genreId != '0'){
      queryStrings.push(`genreId=${formValues.genreId}`);
    }

    if (formValues.upcomingReleases){
      queryStrings.push(`upcomingReleases=${formValues.upcomingReleases}`);
    }

    if (formValues.inTheaters){
      queryStrings.push(`inTheaters=${formValues.inTheaters}`);
    }

    queryStrings.push(`page=$this.currentPage}`);
    queryStrings.push(`recordsPerPage=${this.recordsPerPage}`);

    this.location.replaceState('movies/filter', queryStrings.join('&'));
  }

  paginatorUpdate(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.recordsPerPage = event.pageSize;
    this.writeParamsInURL();
    this.filterMovies(this.form.value);
  }

  clearForm() {
    // this.form.reset();
    this.form.patchValue(this.initialFormValues); //1.2 przyrócenie do inita
  }

  onDelete(){
    this.filterMovies(this.form.value);
  }

}
