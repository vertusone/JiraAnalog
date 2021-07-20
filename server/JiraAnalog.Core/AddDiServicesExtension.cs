using Microsoft.Extensions.DependencyInjection;

using JiraAnalog.Core.Services;
using JiraAnalog.Core.Services.Interfaces;

namespace JiraAnalog.Core
{
    public static class AddDiServicesExtension
    {
        public static void AddCoreServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IJobService, JobService>();
        }
    }
}