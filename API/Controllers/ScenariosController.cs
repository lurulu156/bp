using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
  public class ScenariosController : BaseApiController
  {
    private readonly DataContext _context;
    public ScenariosController(DataContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Scenario>>> GetScenarios()
    {
      return await _context.Scenarios.ToListAsync();
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Scenario>> GetScenario(Guid id)
    {
      return await _context.Scenarios.FindAsync(id);
    }

  }
}