using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
  public class IsHostRequirement : IAuthorizationRequirement
  {
  }
  public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
  {
    private readonly DataContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
      _httpContextAccessor = httpContextAccessor;
      _dbContext = dbContext;

    }

    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
    {
      var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
      if (userId == null) return;

      var scenarioId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
        .SingleOrDefault(x => x.Key == "id").Value.ToString());

      var attendee = await _dbContext.ScenarioAttendees
          .AsNoTracking()
          .FirstOrDefaultAsync(x => x.AppUserId == userId && x.ScenarioId == scenarioId);

      if (attendee == null) return;
      if (attendee.isHost) context.Succeed(requirement);
      return;
    }
  }
}