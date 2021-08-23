using System.Collections.Generic;
using JiraAnalog.Core.Enums;

namespace JiraAnalog.Core.Models
{
    public class EmployeeEntity
    {
        public int Id { get; set; }

        public string FirstName { get; set; }
        
        public string LastName { get; set; }

        public string Email { get; set; }
        
        public string Password { get; set; }

        public int Age { get; set; }
        
        public EmployeeRole Role { get; set; }

        public List<JobEntity> Job { get; set; }
    }
}