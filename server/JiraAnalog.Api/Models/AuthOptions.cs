using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace JiraAnalog.Api.Models
{
    public class AuthOptions
    {
        
        public const string Issuer = "authServer";
        public const string Audience = "resourceServer";
        public const string Secret = "secretKey123456789+-";
        public const double TokenLifetime = 3600;

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Secret));
        }
    }
}