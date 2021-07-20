using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Mapster;

using JiraAnalog.Api.Models;
using JiraAnalog.Core;
using JiraAnalog.Core.Models;
using JiraAnalog.Core.Services.Interfaces;

namespace JiraAnalog.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login(Login request)
        {
            AddResult result = await _authService.LoginAsync(request.Adapt<LoginEntity>());

            switch (result.ResultType)
            {
                case ResultTypes.Ok:
                    return Ok(new {result.Token});
                case ResultTypes.InvalidData:
                    return BadRequest();
            }

            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> RegisterAsync(Account account)
        {
            ResultTypes result = await _authService.RegisterAsync(account.Adapt<AccountEntity>());

            return result switch
            {
                ResultTypes.Duplicate => BadRequest(),
                ResultTypes.Ok => Ok(),
                _ => StatusCode(StatusCodes.Status501NotImplemented)
            };
        }
    }
}