using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Mapster;

using JiraAnalog.Api.Models;
using JiraAnalog.Core;
using JiraAnalog.Core.Enums;
using JiraAnalog.Core.Models;
using JiraAnalog.Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace JiraAnalog.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        // GET: api/employee
        [HttpGet]
        //[Authorize(Roles = nameof(EmployeeRole.Admin))]
        public async Task<ActionResult> GetAsync()
        {
            List<EmployeeEntity> employeeEntity = await _employeeService.GetAllAsync();

            var employees = employeeEntity.Adapt<List<Employee>>();

            return Ok(employees);
        }

        // GET: api/employee/{id}
        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<Employee>> GetAsync(int id)
        {
            EmployeeEntity employeeEntity = await _employeeService.GetByIdAsync(id);

            var employee = employeeEntity.Adapt<Employee>();

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // POST: api/employee/
        [HttpPost]
        //[Authorize(Roles = nameof(EmployeeRole.Admin))]
        public async Task<ActionResult<Employee>> AddAsync(Employee employee)
        {
            AddResult result = await _employeeService.AddAsync(employee.Adapt<EmployeeEntity>());

            return result.ResultType switch
            {
                ResultTypes.Duplicate => BadRequest(),
                ResultTypes.Ok => Ok(),
                _ => StatusCode(StatusCodes.Status501NotImplemented)
            };
        }

        // PUT: api/employee/{id}
        [HttpPut]
        //[Authorize(Roles = nameof(EmployeeRole.Admin))]
        [Route("{id:int}")]
        public async Task<ActionResult> UpdateAsync(int id, Employee employee)
        {
            ResultTypes result = await _employeeService.UpdateAsync(id, employee.Adapt<EmployeeEntity>());
            
            switch (result)
            {
                case ResultTypes.NotFound:
                    return NotFound();

                case ResultTypes.Duplicate:
                    return BadRequest();
            }
            
            return Ok();
        }

        // DELETE: api/employee/{id}
        [HttpDelete]
        //[Authorize(Roles = nameof(EmployeeRole.Admin))]
        [Route("{id:int}")]
        public async Task<ActionResult<Employee>> DeleteAsync(int id)
        {
            ResultTypes result = await _employeeService.DeleteAsync(id);

            if (result == ResultTypes.NotFound)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}