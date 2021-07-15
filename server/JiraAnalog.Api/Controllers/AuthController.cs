using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using JiraAnalog.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace JiraAnalog.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [Route("login")]
        [HttpPost]
        public ActionResult Login(Login request)
        {
            var user = AuthenticateUser(request.Nickname, request.Password);

            if (user != null)
            {
                var token = GenerateJWT(user);

                Response.Cookies.Append("token", token, new CookieOptions
                {
                    HttpOnly = true
                });

                return Ok(new
                    {
                        access_token = token,
                        user
                    }
                );
            }

            return Unauthorized();
        }

        [Route("register")]
        [HttpPost]
        public async Task<ActionResult> Register(Account account)
        {
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private Account AuthenticateUser(string nickname, string password)
        {
            return _context.Accounts.SingleOrDefault(x => x.Nickname == nickname && x.Password == password);
        }

        private string GenerateJWT(Account user)
        {
            var securityKey = AuthOptions.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Nickname),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString())
            };

            var token = new JwtSecurityToken(issuer: AuthOptions.Issuer,
                audience: AuthOptions.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(AuthOptions.TokenLifetime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}