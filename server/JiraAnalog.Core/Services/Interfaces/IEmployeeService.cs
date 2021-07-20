using System.Collections.Generic;
using System.Threading.Tasks;

using JiraAnalog.Core.Models;

namespace JiraAnalog.Core.Services.Interfaces
{
    public interface IEmployeeService
    {
        Task<List<EmployeeEntity>> GetAllAsync();
        Task<EmployeeEntity> GetByIdAsync(int id); 
        Task<AddResult> AddAsync(EmployeeEntity employeeEntity);
        Task<ResultTypes> UpdateAsync(int id, EmployeeEntity employeeEntity);
        Task<ResultTypes> DeleteAsync(int id);
    }
}