using System.ComponentModel.DataAnnotations;

namespace JiraAnalog.Api.Models
{
    public class Login
    {
        [Required]
        public string Nickname { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}