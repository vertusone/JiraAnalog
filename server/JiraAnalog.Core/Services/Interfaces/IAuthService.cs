using System.Threading.Tasks;

using JiraAnalog.Core.Models;

namespace JiraAnalog.Core.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AddResult> LoginAsync(LoginEntity request);
        Task<ResultTypes> RegisterAsync(EmployeeEntity employeeEntity);
    }
}