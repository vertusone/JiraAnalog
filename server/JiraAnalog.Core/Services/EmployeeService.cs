using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using JiraAnalog.Core.Models;
using JiraAnalog.Core.Services.Interfaces;

namespace JiraAnalog.Core.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly ApplicationDbContext _context;

        public EmployeeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<EmployeeEntity>> GetAllAsync()
        {
            return await _context.Employees.Include(x => x.Job).ToListAsync();
        }

        public async Task<EmployeeEntity> GetByIdAsync(int id)
        {
            return await _context.Employees.Include(x => x.Job).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<AddResult> AddAsync(EmployeeEntity employeeEntity)
        {
            EmployeeEntity duplicateEmployeeEntity =
                await _context.Employees.FirstOrDefaultAsync(x => x.Email == employeeEntity.Email);

            if (duplicateEmployeeEntity != null)
            {
                return new AddResult
                {
                    ResultType = ResultTypes.Duplicate
                };
            }

            _context.Employees.Add(employeeEntity);
            await _context.SaveChangesAsync();

            return new AddResult {ResultType = ResultTypes.Ok};
        }


        public async Task<ResultTypes> UpdateAsync(int id, EmployeeEntity employeeEntity)
        {
            employeeEntity.Id = id;

            if (employeeEntity.Id == null)
            {
                return ResultTypes.NotFound;
            }

            _context.Employees.Update(employeeEntity);
            await _context.SaveChangesAsync();
            
            return ResultTypes.Ok;
        }

        public async Task<ResultTypes> DeleteAsync(int id)
        {
            var employee = await _context.Employees.Include(x => x.Job).FirstOrDefaultAsync(c => c.Id == id);
            
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            
            return ResultTypes.Ok;
        }
    }
}