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
            var user = AuthenticateUser(request.Email, request.Password);

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

        public async Task<ResultTypes> RegisterAsync(EmployeeEntity employeeEntity)
        {
            EmployeeEntity duplicateAccountEntity = await _context.Employees.FirstOrDefaultAsync(x => x.Email == employeeEntity.Email);

            if (duplicateAccountEntity != null)
            {
                return ResultTypes.Duplicate;
            }
            
            _context.Employees.Add(employeeEntity);
            await _context.SaveChangesAsync();
            
            return ResultTypes.Ok;
        }

        private EmployeeEntity AuthenticateUser(string email, string password)
        {
            return _context.Employees.SingleOrDefault(x => x.Email == email && x.Password == password);
        }
        
        private string GenerateJWT(EmployeeEntity user)
        {
            var securityKey = AuthOptions.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
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