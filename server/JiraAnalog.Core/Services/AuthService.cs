using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using JiraAnalog.Api.Models;
using JiraAnalog.Core.Models;
using JiraAnalog.Core.Services.Interfaces;

namespace JiraAnalog.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;

        public AuthService(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<AddResult> LoginAsync(LoginEntity request)
        {
            var user = AuthenticateUser(request.Nickname, request.Password);

            if (user != null)
            {
                var token = GenerateJWT(user);

                return new AddResult
                {
                    ResultType = ResultTypes.Ok,
                    Token = token
                };

            }

            return new AddResult
            {
                ResultType = ResultTypes.InvalidData
            };
        }

        public async Task<ResultTypes> RegisterAsync(AccountEntity accountEntity)
        {
            AccountEntity duplicateAccountEntity = await _context.Accounts.FirstOrDefaultAsync(x => x.Nickname == accountEntity.Nickname);

            if (duplicateAccountEntity != null)
            {
                return ResultTypes.Duplicate;
            }
            
            _context.Accounts.Add(accountEntity);
            await _context.SaveChangesAsync();
            
            return ResultTypes.Ok;
        }

        private AccountEntity AuthenticateUser(string nickname, string password)
        {
            return _context.Accounts.SingleOrDefault(x => x.Nickname == nickname && x.Password == password);
        }
        
        private string GenerateJWT(AccountEntity user)
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