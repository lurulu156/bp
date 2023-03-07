using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Scenarios
{
  public class List
  {
    public class Query : IRequest<Result<List<Scenario>>> { }
    public class Handler : IRequestHandler<Query, Result<List<Scenario>>>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }
      public async Task<Result<List<Scenario>>> Handle(Query request, CancellationToken cancellationToken)
      {
        var scenarios = await _context.Scenarios.ToListAsync();
        return Result<List<Scenario>>.Success(scenarios);
      }
    }
  }
}