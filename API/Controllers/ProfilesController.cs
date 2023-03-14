using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ProfilesController : BaseApiController
  {
    [HttpGet("{username}")]
    public async Task<IActionResult> GetProfile(string username)
    {
      return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
    }
    [HttpGet("{username}/scenarios")]
    public async Task<IActionResult> GetUserScenarios(string username, string predicate)
    {
      return HandleResult(await Mediator.Send(new ListScenario.Query { Username = username, Predicate = predicate }));
    }

  }
}