using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoviesAPI.Filters //należy również użyć go w startup.cs
{
    public class MyExeptionFilter: ExceptionFilterAttribute
    {
        private readonly ILogger<MyExeptionFilter> logger;

        public MyExeptionFilter(ILogger<MyExeptionFilter> logger)
        {
            this.logger = logger;
        }

        public override void OnException(ExceptionContext context) //snippet override on tabtab
        {
            //context.HttpContext także dostępn do contentu http
            logger.LogError(context.Exception, context.Exception.Message);
            base.OnException(context); 
        }
    }
}
