using System.Collections.Generic;
using System.Threading.Tasks;
using JiraAnalog.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JiraAnalog.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Employee
        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetAll()
        {
            var employees = await _context.Employees.Include(x => x.Job).ToListAsync();
            
            return employees;
        }

        // GET: Employee/Details/
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var employee = await _context.Employees.Include(x => x.Job).FirstOrDefaultAsync(c => c.Id == id);
            
            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // GET: Employee/Create
        [HttpPost]
        public async Task<ActionResult<Employee>> Create(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // GET: Employee/Edit/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(int id, Employee employee)
        {
            employee.Id = id;
            
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: Employee/Delete/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var employee = await _context.Employees.Include(x => x.Job).FirstOrDefaultAsync(c => c.Id == id);
            
            if (employee == null)
            {
                return NotFound();
            }
            else
            {
                _context.Employees.Remove(employee);
            }
            
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
