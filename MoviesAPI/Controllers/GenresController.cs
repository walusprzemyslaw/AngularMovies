using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MoviesAPI.Controllers
{
    [Route("api/genres")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] // autoryzacja użytkownika, edycja w startup.cs
    public class GenresController : ControllerBase
    {
        private readonly ILogger<GenresController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public GenresController(ILogger<GenresController> logger,
            ApplicationDbContext context,
            IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<GenreDTO>>> Get()
        {
            logger.LogInformation("Getting ALL");
            var genres = await context.Genres.ToListAsync();
            return mapper.Map<List<GenreDTO>>(genres);
            //var genresDTOs = new List<GenreDTO>();                                                //manual mapping - useless, normalnie przez automapper
            //foreach(var genre in genres)
            //{
            //    genresDTOs.Add(new GenreDTO() { Id = genre.Id, Name = genre.Name });
            //}
            //return genresDTOs;
        }

        #region Test
        //[HttpGet("{Id}")] //api/genres/Id  // [HttpGet("example")] //api/genres/example
        //public Genre Get(int Id)
        //{
        //    var genre = repository.GetGenereById(Id);
        //    if (genre == null)
        //    {
        //        //return NotFound();
        //    }
        //    return genre;
        //}
        #endregion

        [HttpGet("{id:int}")] //api/genres/Id  // [HttpGet("example")] //api/genres/example //można także wiecej "{Id:int}/{param2=felipe"
        public async Task<ActionResult<GenreDTO>> Get(int Id)//, [BindRequired] string param2) //tutaj można także użyć IActionResult i wtedy w returnie: Ok(genre); ale wtedy nie definiujesz zwracanego typu
        {
            var genre = await context.Genres.FirstOrDefaultAsync(x => x.Id == Id);

            if(genre == null)
            {
                return NotFound();
            }

            return mapper.Map<GenreDTO>(genre);
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GenreCreationDTO genreCreationDTO)
        {
            var genre = mapper.Map<Genre>(genreCreationDTO);
            context.Add(genre);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] GenreCreationDTO genreCreationDTO)
        {
            var genre = mapper.Map<Genre>(genreCreationDTO);
            genre.Id = id;
            context.Entry(genre).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var genre = await context.Genres.FirstOrDefaultAsync(x => x.Id == id);

            if(genre == null)
            { return NotFound(); }

            context.Remove(genre);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
