using System.ComponentModel.DataAnnotations;

namespace JiraAnalog.Core.Models
{
    public class LoginEntity
    {
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}