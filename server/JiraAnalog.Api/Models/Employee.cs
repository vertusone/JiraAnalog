using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using JiraAnalog.Core.Enums;

namespace JiraAnalog.Api.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The first name is required")]
        public string FirstName { get; set; }
        
        public string LastName { get; set; }
        
        [Required(ErrorMessage = "The email address is required")]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }
        
        [Required(ErrorMessage = "The password is required")]
        [StringLength(30, MinimumLength = 6, ErrorMessage = "Minimum 6 characters")]
        public string Password { get; set; }

        public int Age { get; set; }
        
        [Required(ErrorMessage = "The role is required")]
        public EmployeeRole Role { get; set; }

        public List<JobType> Job { get; set; }
    }
}