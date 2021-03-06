using JiraAnalog.Core.Enums;

namespace JiraAnalog.Api.Models
{
    public class EmployeeType
    {
        public int Id { get; set; }

        public string FirstName { get; set; }
        
        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int Age { get; set; }

        public EmployeeRole Role { get; set; }
    }
}