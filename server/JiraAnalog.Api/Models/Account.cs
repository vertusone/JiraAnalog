using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JiraAnalog.Api.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }
        
        [Column(TypeName ="nvarchar(100)")]
        public string Nickname { get; set; }

        [Column(TypeName ="nvarchar(100)")]
        public string Password { get; set; }
    }
}