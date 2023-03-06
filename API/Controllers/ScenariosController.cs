using Application.Scenarios;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
  public class ScenariosController : BaseApiController
  {
    [HttpGet]
    public async Task<ActionResult<List<Scenario>>> GetScenarios()
    {
      return await Mediator.Send(new List.Query());
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Scenario>> GetScenario(Guid id)
    {
      return await Mediator.Send(new Details.Query { Id = id });
    }
  }
}