using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JiraAnalog.Core.Models
{
    public class AccountEntity
    {
        [Key]
        public int Id { get; set; }
        
        [Column(TypeName ="nvarchar(100)")]
        public string Nickname { get; set; }

        [Column(TypeName ="nvarchar(100)")]
        public string Password { get; set; }
    }
}